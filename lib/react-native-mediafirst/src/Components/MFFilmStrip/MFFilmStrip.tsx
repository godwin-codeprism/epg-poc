import React, { ReactComponentElement, NamedExoticComponent } from "react";
import {
    Animated,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Platform,
    ListRenderItemInfo,
} from "react-native";
import { MediaFirstFilmStripStyles, DefaultThemeStyles } from "../../styles";
import { SmartFlatList } from "../ListsTVOS";
import { MFFilmStripProps } from "./MFFilmStripProps";
import { Logger, CARD_SCALE_ON_SELECTED, CARD_STOCK_DIMENTIONS, getDefaultSize } from "../../Utils";
import { MediaFirst } from "../../MediaFirst";
import { MFCardProps } from "../MFCard/MFCardProps";
type Item = any;
const AnimatedFlatList = Platform.OS === "web" ? SmartFlatList : Animated.createAnimatedComponent(SmartFlatList);
interface State {
    datasource?: ReadonlyArray<Item> | null;
    title: string;
    addBreathingSpace: boolean;
    breathingSpaceLeft: Animated.Value | number;
    breathingSpaceRight: Animated.Value | number;
}
class MFFirstFilmStrip<Item> extends React.PureComponent<MFFilmStripProps<Item>, State> {
    public flatListRef: FlatList<Item> | null;
    public _renderItems: (info: ListRenderItemInfo<Item>) => any;
    public isListOfMediaFirstCardLeft: boolean | "" | undefined = false;
    public isListOfMediaFirstCardRight: boolean | "" | undefined = false;
    public firstListItem: ReactComponentElement<NamedExoticComponent, MFCardProps>;
    public lastListItem: ReactComponentElement<NamedExoticComponent, MFCardProps>;
    constructor(props: MFFilmStripProps<Item>) {
        super(props);
        MediaFirst.validateLibraryInit();
        this.state = {
            title: "",
            addBreathingSpace: false,
            breathingSpaceLeft: new Animated.Value(0),
            breathingSpaceRight: new Animated.Value(0),
        };
        this.flatListRef = null;
        this.firstListItem = this.props.renderItem.bind(this)({
            item: this.props.datasource && this.props.datasource[0],
        });
        this.lastListItem = this.props.renderItem.bind(this)({
            item: this.props.datasource && this.props.datasource[this.props.datasource.length - 1],
        });
        this.isListOfMediaFirstCardLeft =
            this.firstListItem.props._displayName &&
            this.firstListItem.props._displayName === "MediaFirstCard" &&
            this.firstListItem.props.activeMode &&
            this.firstListItem.props.activeMode.mode === "scale";
        this.isListOfMediaFirstCardRight =
            this.lastListItem.props._displayName &&
            this.lastListItem.props._displayName === "MediaFirstCard" &&
            this.lastListItem.props.activeMode &&
            this.lastListItem.props.activeMode.mode === "scale";
        this._renderItems = ({ item, index }) => {
            return React.cloneElement(this.props.renderItem({ item: item }), {
                getParentFilmStrip: this.getFilmStripRef.bind(this),
                toggleBreatingSpaceLeft: this.toggleBreatingSpaceLeft,
                toggleBreatingSpaceRight: this.toggleBreatingSpaceRight,
                itemIndex: index,
                dataLength: this.props.datasource && this.props.datasource.length,
            });
        };
    }

    componentWillReceiveProps(nextProps: MFFilmStripProps<Item>) {
        if (nextProps.datasource !== this.props.datasource) {
            //Perform some operation
            this.setState({ datasource: nextProps.datasource });
        }
        if (nextProps.title !== this.props.title) {
            //Perform some operation
            this.setState({ title: nextProps.title });
        }
    }
    /* Check the props validation before we render the component view. renderItem and title and datasource props are mandatory in props */
    componentWillMount() {
        Logger.debug("MediaFirstFilmStrip props::", this.props);
        if (!this.props) throw new Error("E1003 props are invalid");
        if (!this.props.renderItem) throw new Error("E1004 renderItem must be valid");
        if (!this.props.title) throw new Error("E1005 title must be valid");
        if (!this.props.datasource) throw new Error("E1006 datasource must be valid");
        this.setState({ datasource: this.props.datasource, title: this.props.title });
    }
    componentWillUpdate(newProps: MFFilmStripProps<Item>, newState: State) {
        this.firstListItem = newProps.renderItem.bind(this)({ item: newProps.datasource && newProps.datasource[0] });
        this.lastListItem = this.props.renderItem.bind(this)({
            item: newProps.datasource && newProps.datasource[newProps.datasource.length - 1],
        });
        this.isListOfMediaFirstCardLeft =
            this.firstListItem.props._displayName &&
            this.firstListItem.props._displayName === "MediaFirstCard" &&
            this.firstListItem.props.activeMode &&
            this.firstListItem.props.activeMode.mode === "scale";
        this.isListOfMediaFirstCardRight =
            this.lastListItem.props._displayName &&
            this.lastListItem.props._displayName === "MediaFirstCard" &&
            this.lastListItem.props.activeMode &&
            this.lastListItem.props.activeMode.mode === "scale";
        this._renderItems = ({ item, index }) => {
            return React.cloneElement(newProps.renderItem({ item: item }), {
                getParentFilmStrip: this.getFilmStripRef.bind(this),
                toggleBreatingSpaceLeft: this.toggleBreatingSpaceLeft,
                toggleBreatingSpaceRight: this.toggleBreatingSpaceRight,
                itemIndex: index,
                dataLength: newProps.datasource && newProps.datasource.length,
            });
        };
    }

    getFilmStripRef = () => this.flatListRef;
    keyExtractor = (item: MFFilmStripProps<Item>, index: number) => index;
    calculateBreathingSpaceTopAndBottom() {
        const {
            activeMode,
            aspectRatio,
            height,
            width,
            style,
            activeCardStyle,
            metaInfoPosition,
            titleContainerStyle,
            subtitleNumOfLines,
            titleNumOfLines,
        } = this.firstListItem.props;
        let size = {
            height: height,
            width: width,
        };
        let shadowSpace = 0;
        const _ViewStyles = StyleSheet.flatten([style, activeCardStyle]);
        const _titleContainerStyle = titleContainerStyle && StyleSheet.flatten(titleContainerStyle);
        if (Platform.OS === "android") {
            if (style && _ViewStyles.elevation) {
                shadowSpace = _ViewStyles.elevation;
            }
        } else {
            if (style && _ViewStyles.shadowRadius) {
                shadowSpace = _ViewStyles.shadowRadius;
            }
        }
        if (activeMode && activeMode.mode === "scale") {
            if (!width && !height) {
                size = getDefaultSize(aspectRatio);
            } else {
                if (!height && width) {
                    let ratio = aspectRatio.split(":").map((i) => parseInt(i));
                    size.height = (width * ratio[1]) / ratio[0];
                }
            }
            if (size.height) {
                if (activeMode.cardScaleOnSelected) {
                    size.height = size.height + size.height * activeMode.cardScaleOnSelected;
                } else {
                    size.height = size.height + size.height * CARD_SCALE_ON_SELECTED;
                }
            }
        }
        if (metaInfoPosition === "bottom" || metaInfoPosition === "top") {
            if (_titleContainerStyle && _titleContainerStyle.height) {
                size.height =
                    size.height &&
                    size.height +
                        (typeof _titleContainerStyle.height === "string"
                            ? parseInt(_titleContainerStyle.height)
                            : _titleContainerStyle.height);
            } else {
                size.height =
                    size.height &&
                    size.height +
                        50 +
                        (titleNumOfLines && titleNumOfLines > 1 ? titleNumOfLines * 10 : 0) +
                        (subtitleNumOfLines && subtitleNumOfLines > 1 ? subtitleNumOfLines * 10 : 0);
            }
        }
        return { height: size.height ? size.height + shadowSpace * 4.5 : "100%", alignItems: "center" };
    }
    calculateBreathingSpaceLeft() {
        if (this.isListOfMediaFirstCardLeft) {
            const { activeMode, width, aspectRatio } = this.firstListItem.props;
            const _cardScaleOnSelected =
                activeMode && activeMode.mode === "scale" ? activeMode.cardScaleOnSelected : CARD_SCALE_ON_SELECTED;
            const _cardWidth = width ? width : CARD_STOCK_DIMENTIONS[aspectRatio].width;
            const paddingLeft = Math.round((_cardWidth * (_cardScaleOnSelected ? _cardScaleOnSelected : 1)) / 2);
            if (Platform.OS === "web") {
                this.setState({ breathingSpaceLeft: paddingLeft });
            } else {
                if (typeof this.state.breathingSpaceLeft !== "number") {
                    Animated.timing(this.state.breathingSpaceLeft, {
                        toValue: paddingLeft,
                        duration:
                            DefaultThemeStyles.CardScaleAnimDuration - DefaultThemeStyles.CardScaleAnimDuration * 0.3,
                    }).start();
                }
            }
        }
    }
    calculateBreathingSpaceRight() {
        if (this.isListOfMediaFirstCardRight) {
            const { activeMode, width, aspectRatio } = this.firstListItem.props;
            const _cardScaleOnSelected =
                activeMode && activeMode.mode === "scale" ? activeMode.cardScaleOnSelected : CARD_SCALE_ON_SELECTED;
            const _cardWidth = width ? width : CARD_STOCK_DIMENTIONS[aspectRatio].width;
            const paddingRight = Math.round((_cardWidth * (_cardScaleOnSelected ? _cardScaleOnSelected : 1)) / 2);
            if (Platform.OS === "web") {
                this.setState({ breathingSpaceRight: paddingRight });
            } else {
                if (typeof this.state.breathingSpaceRight !== "number") {
                    Animated.timing(this.state.breathingSpaceRight, {
                        toValue: paddingRight,
                        duration:
                            DefaultThemeStyles.CardScaleAnimDuration - DefaultThemeStyles.CardScaleAnimDuration * 0.3,
                    }).start();
                }
            }
        }
    }
    toggleBreatingSpaceLeft = (bool: boolean) => {
        if (bool) {
            this.calculateBreathingSpaceLeft();
        } else {
            if (typeof this.state.breathingSpaceLeft !== "number") {
                Animated.timing(this.state.breathingSpaceLeft, {
                    toValue: 0,
                    duration: DefaultThemeStyles.CardScaleAnimDuration + DefaultThemeStyles.CardScaleAnimDuration * 0.3,
                }).start();
            }
            if (Platform.OS === "web") {
                this.setState({ breathingSpaceLeft: 0 });
            }
        }
    };
    toggleBreatingSpaceRight = (bool: boolean) => {
        if (bool) {
            this.calculateBreathingSpaceRight();
        } else {
            if (typeof this.state.breathingSpaceRight !== "number") {
                Animated.timing(this.state.breathingSpaceRight, {
                    toValue: 0,
                    duration: DefaultThemeStyles.CardScaleAnimDuration + DefaultThemeStyles.CardScaleAnimDuration * 0.3,
                }).start();
            }
            if (Platform.OS === "web") {
                this.setState({ breathingSpaceRight: 0 });
            }
        }
    };

    render() {
        let keyExtractor = !this.props || !this.props.keyExtractor ? this.keyExtractor : this.props.keyExtractor;
        let titleStyle = !this.props || !this.props.titleStyle ? _styles.title : this.props.titleStyle;
        let filmStripContainerStyle = this.props.filmStripContainerStyle
            ? this.props.filmStripContainerStyle
            : _styles.container;
        let showsHorizontalScrollIndicator =
            !this.props || !this.props.showsHorizontalScrollIndicator
                ? false
                : this.props.showsHorizontalScrollIndicator;
        let horizontal = this.props.horizontal !== undefined ? this.props.horizontal : true;
        let numColumns = this.props.numColumns ? this.props.numColumns : 1;
        const NativeFlatListContainerStyles = [
            this.isListOfMediaFirstCardLeft && this.calculateBreathingSpaceTopAndBottom(),
            this.isListOfMediaFirstCardLeft && this.calculateBreathingSpaceTopAndBottom(),
            { paddingLeft: this.isListOfMediaFirstCardLeft ? this.state.breathingSpaceLeft : 0 },
            { paddingRight: this.isListOfMediaFirstCardRight ? this.state.breathingSpaceRight : 0 },
            Platform.OS === "web"
                ? {
                      transition: `padding-left ${
                          DefaultThemeStyles.CardScaleAnimDuration
                      }ms ease-in-out, padding-right ${DefaultThemeStyles.CardScaleAnimDuration}ms ease-in-out`,
                  }
                : null,
        ];
        return (
            <View style={filmStripContainerStyle}>
                <View style={_styles.topBarContainer}>
                    <View
                        style={[
                            _styles.filmStripTitleContainer,
                            titleStyle.fontSize ? { height: titleStyle.fontSize * 2 } : null,
                        ]}
                    >
                        <Text style={titleStyle}>{this.state.title}</Text>
                    </View>
                    {this.props.mobileViewAll &&
                    this.props.mobileViewAll.enable &&
                    MediaFirst.getMediaFirstConfig().deviceType === "Mobile" ? (
                        <View style={[_styles.mobileViewAllContainer, this.props.mobileViewAll.viewAllContainerStyles]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.mobileViewAll &&
                                        this.props.mobileViewAll.onPressViewAll &&
                                        this.props.mobileViewAll.onPressViewAll();
                                }}
                                {...this.props.mobileViewAll.viewAllTouchableProps}
                            >
                                <Text style={this.props.mobileViewAll.viewAllTextStyles}>
                                    {this.props.mobileViewAll.viewAllText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
                <View>
                    <AnimatedFlatList
                        ref={(ref: FlatList<Item>) => {
                            this.flatListRef = ref;
                        }}
                        numColumns={numColumns}
                        contentContainerStyle={[this.props.contentContainerStyle, NativeFlatListContainerStyles]}
                        keyExtractor={keyExtractor}
                        style={_styles.listStyle}
                        data={this.state.datasource}
                        automaticallyAdjustContentInsets={false}
                        horizontal={horizontal}
                        removeClippedSubviews={true}
                        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
                        showsVerticalScrollIndicator={false}
                        renderItem={
                            this.isListOfMediaFirstCardLeft || this.isListOfMediaFirstCardRight
                                ? this._renderItems
                                : this.props.renderItem
                        }
                    />
                </View>
            </View>
        );
    }
}

export const _styles = MediaFirstFilmStripStyles;

export default MFFirstFilmStrip;
