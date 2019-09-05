import React from "react";
import {
    Animated,
    Easing,
    TouchableOpacity,
    View,
    StyleSheet,
    Platform,
    NativeSyntheticEvent,
    TargetedEvent,
    GestureResponderEvent,
} from "react-native";
import { DefaultThemeStyles, MediaFirstCardStyles } from "../../styles";
import { getDefaultSize, Logger, Size } from "../../Utils";
import MFCardImage from "./MFCardImage";
import { MFCardProps } from "./MFCardProps";
import { MediaFirst } from "../../MediaFirst";
"use strict";
export interface MFCardState {
    isFocused?: boolean;
}
/**
 MediaFirstCard will be rendered by MediaFirstFilmStrip component and can also be rendered as a individual component on the screen. MediaFirstCard will expect poster image source, preview source and meta info and gives the click, focus and blur events callbacks. A single component can handle multiple aspect ratio of cards and sizes, based on aspectRatio props.
**/
class MFCard extends React.PureComponent<MFCardProps, MFCardState> {
    static defaultProps: any;
    public size: Size;
    public animatedValue: Animated.Value;
    public coverPosterRef: React.RefObject<TouchableOpacity>;
    static displayName: string;
    constructor(props: MFCardProps) {
        super(props);
        Logger.log("initializing card with ::", props);
        MFCard.displayName = "MediaFirstCard";
        this.animatedValue = new Animated.Value(0);
        this.coverPosterRef = React.createRef();
        this.state = {
            isFocused: false,
        };
        this.size = getDefaultSize(DefaultThemeStyles.CardAspectRatio);
    }

    /* Handles the scale animation when card is focused and blurred. with the defaultCardScaleDuration and Easing poly effect.
     */
    handleAnimation = () => {
        Logger.log("handleAnimation");
        Animated.timing(this.animatedValue, {
            toValue: this.state.isFocused ? 1 : 0,
            duration: DefaultThemeStyles.CardScaleAnimDuration,
            easing: Easing.out(Easing.poly(2)),
            useNativeDriver: true,
        }).start();
    };
    /* Linkned to TouchbaleOpacity onFocus and called with the index prop of the card, when the card is focused sends the prop callback onFocus to user with index prop, and starts the scale animation if enabled.
     */
    _onFocus(e: MouseEvent | NativeSyntheticEvent<TargetedEvent> | GestureResponderEvent) {
        console.log("Foucs Fired");
        Logger.log("_onFocus: MediaFirstCard is focused at index", this.props.index);
        if (this.props.toggleBreatingSpaceLeft && this.props.itemIndex === 0) {
            this.props.toggleBreatingSpaceLeft(true);
        }
        const dataLength = this.props.dataLength && this.props.dataLength - 1;
        if (this.props.toggleBreatingSpaceRight && this.props.itemIndex === dataLength) {
            this.props.toggleBreatingSpaceRight(true);
        }
        this.setState({ isFocused: true }, () => {
            this.props.activeMode && this.props.activeMode.mode === "scale" && this.handleAnimation();
        });
        if (Platform.OS === "web") {
            const target = e.currentTarget as HTMLButtonElement;
            if (target.parentElement && target.parentElement.parentElement)
                target.parentElement.parentElement.style.zIndex = "10000";
        }
    }
    /* Linkned to TouchbaleOpacity onBlur and called with the index prop of the card, but It is disabled for now to pass the callback to user, when the card losses focus sends the prop onBlur callback index prop callback to user by index prop, and starts the scale animation if enabled.
     */
    _onBlur(e: MouseEvent | NativeSyntheticEvent<TargetedEvent> | GestureResponderEvent) {
        Logger.log("_onFocus: MediaFirstCard is blurred at index", this.props.index);
        // this.props.onBlur && this.props.onBlur(this.props.index);
        if (this.props.toggleBreatingSpaceLeft && this.props.itemIndex === 0) {
            this.props.toggleBreatingSpaceLeft(false);
        }
        const dataLength = this.props.dataLength && this.props.dataLength - 1;
        if (this.props.toggleBreatingSpaceRight && this.props.itemIndex === dataLength) {
            this.props.toggleBreatingSpaceRight(false);
        }
        this.setState({ isFocused: false }, () => {
            this.props.activeMode && this.props.activeMode.mode === "scale" && this.handleAnimation();
        });
        if (Platform.OS === "web") {
            const target = e.currentTarget as HTMLButtonElement;
            if (target.parentElement && target.parentElement.parentElement)
                target.parentElement.parentElement.style.zIndex = "0";
        }
    }

    /* Linkned to TouchbaleOpacity onPress and called with the index prop of the card.
     */
    _onPress() {
        Logger.log("_onPress: MediaFirstCard clicked at index", this.props.index);
        console.log("OnPress Fired");
        this.props.onPress && this.props.onPress(this.props.index);
    }
    /* Linkned to TouchbaleOpacity onLongPress and called with the index prop of the card.
     */
    _onInfoPressed() {
        Logger.log("_onInfoPressed: MediaFirstCard info action at index", this.props.index);
        this.props.onInfoPressed && this.props.onInfoPressed(this.props.index);
    }

    componentWillMount() {
        Logger.log("componentWillMount");
    }
    /* Calculates the card size based on aspectRatio, height and width props. throws an error "E1000 Card height and width both are mandatory while using exclusive card size, or define aspectRatio with one of the height or width." message when none of the size props passed. also throws an error "E1001 Please use aspectRatio with height or width onl" when all of the props are passed. Uses UiUtil.getDefaultSize method to get default aspectRatio or height or width.
     */
    calculateSize() {
        if (!this.props.aspectRatio) {
            if (!this.props.height || !this.props.width) {
                throw new Error(
                    "E1000 Card height and width both are mandatory while using exclusive card size, or define aspectRatio with one of the height or width."
                );
            }
            const size: Size = {
                height: this.props.height,
                width: this.props.width,
            };
            Logger.log("calculateSize  size:: ", this.size);
            return size;
        }
        if (this.props.aspectRatio && this.props.width && this.props.height) {
            throw new Error("E1001 Please use aspectRatio with height or width only");
        }
        const whR = this.props.aspectRatio.split(":");
        const widthR = parseInt(whR[0]);
        const heightR = parseInt(whR[1]);
        const size: Size = getDefaultSize(this.props.aspectRatio);
        Logger.log("CardSize:: ", size, " widthR:: ", widthR, " heightR:: ", heightR);
        if (widthR && heightR) {
            if (this.props.height) {
                size.height = this.props.height;
                size.width = (size.height * widthR) / heightR;
            } else if (this.props.width) {
                size.width = this.props.width;
                size.height = (size.width * heightR) / widthR;
            }
        }
        Logger.log("calculateSize size:: ", this.size);
        return size;
    }

    /* Renders the title section using titleStyle, subtitleStyle and titleContainerStyle props. border and borderOnActive styles are also applied on android OS.*/
    renderTitleSection() {
        Logger.log("renderTitleSection");
        /* const gradientHeight = 50;
		const gradientBackground = 'black';
		const data = Array.from({ length: gradientHeight }); */
        const { titlePartition } = this.props;
        const titleStyle = this.props.titleStyle ? this.props.titleStyle : libStyles.titleStyle;
        const subtitleStyle = this.props.subtitleStyle ? this.props.subtitleStyle : libStyles.subtitleStyle;
        const titleNumOfLines = this.props.titleNumOfLines ? this.props.titleNumOfLines : 2;
        const subtitleNumOfLines = this.props.subtitleNumOfLines ? this.props.subtitleNumOfLines : 2;
        const titleEllipsizeMode = this.props.titleEllipsizeMode ? this.props.titleEllipsizeMode : "tail";
        const subtitleEllipsizeMode = this.props.subtitleEllipsizeMode ? this.props.subtitleEllipsizeMode : "tail";
        let borderRadiusStyle;
        const borderRadius =
            this.props.posterImageStyle && this.props.posterImageStyle.borderRadius
                ? this.props.posterImageStyle.borderRadius
                : libStyles.cardBorderStyle && libStyles.cardBorderStyle.borderRadius;
        if (
            this.props.metaInfoPosition === "overlay" &&
            this.props.activeMode &&
            this.props.activeMode.mode === "scale"
        ) {
            borderRadiusStyle = { borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius };
        }
        let borderStyle;
        if (this.props.activeMode && this.props.activeMode.mode === "border") {
            const borderWidth = this.props.borderWidth ? this.props.borderWidth : 2;
            const borderColor = this.props.borderColor ? this.props.borderColor : "white";
            const borderColorOnActive = this.props.borderColorOnActive ? this.props.borderColorOnActive : "red";
            borderStyle = {
                borderLeftWidth: borderWidth,
                borderRightWidth: borderWidth,
                borderLeftColor: this.state.isFocused ? borderColorOnActive : borderColor,
                borderRightColor: this.state.isFocused ? borderColorOnActive : borderColor,
            };
        }
        const overlaystyle = this.props.metaInfoPosition === "overlay" && {
            position: "absolute" as "absolute",
            backgroundColor: "rgba(0,0,0,0.8)",
            bottom:
                this.props.showProgressBar === "show"
                    ? this.props.progressBarStyle && this.props.progressBarStyle.height
                        ? this.props.progressBarStyle.height
                        : libStyles.progressBarStyle.height
                    : 0,
        };
        const titleContainerStyle = [
            { width: this.size.width },
            this.props.metaInfoPosition !== "overlay"
                ? {
                      height:
                          50 +
                          (titleNumOfLines && titleNumOfLines > 1 ? titleNumOfLines * 10 : 0) +
                          (subtitleNumOfLines && subtitleNumOfLines > 1 ? subtitleNumOfLines * 10 : 0),
                  }
                : null,
            overlaystyle,
            this.props.titleContainerStyle,
            borderRadiusStyle,
            MediaFirst.getMediaFirstConfig().os === "android" && borderStyle,
        ];
        let PartitionArray: number[] = [1, 1];
        if (titlePartition) {
            if (titlePartition.partitionRatio) {
                if (
                    titlePartition.partitionRatio.includes(":") &&
                    !isNaN(parseInt(titlePartition.partitionRatio.split(":")[0])) &&
                    !isNaN(parseInt(titlePartition.partitionRatio.split(":")[1]))
                ) {
                    const LHS = parseInt(titlePartition.partitionRatio.split(":")[0]);
                    const RHS = parseInt(titlePartition.partitionRatio.split(":")[1]);
                    PartitionArray = [(LHS / (LHS + RHS)) * 100, (RHS / (LHS + RHS)) * 100];
                } else {
                    throw new Error(`E1010 ${titlePartition.partitionRatio} is not a valid partition ration`);
                }
            } else {
                throw new Error(`E1009 partitionRatio must be provided, if you wish to use title partition`);
            }
        }
        return (
            <View style={titleContainerStyle}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View
                        style={[
                            titlePartition ? { flex: PartitionArray[0] } : null,
                            titlePartition && titlePartition.partition1Styles ? titlePartition.partition1Styles : null,
                        ]}
                    >
                        {!this.props.title ? null : (
                            <Animated.Text
                                style={titleStyle}
                                numberOfLines={titleNumOfLines}
                                ellipsizeMode={titleEllipsizeMode}
                            >
                                {!this.props.title ? "" : this.props.title}
                            </Animated.Text>
                        )}
                        {!this.props.subtitle ? null : (
                            <Animated.Text
                                style={subtitleStyle}
                                numberOfLines={subtitleNumOfLines}
                                ellipsizeMode={subtitleEllipsizeMode}
                            >
                                {this.props.subtitle}
                            </Animated.Text>
                        )}
                    </View>
                    {titlePartition && (
                        <View
                            style={[
                                { flex: PartitionArray[1] },
                                titlePartition.partition2Styles ? titlePartition.partition2Styles : null,
                            ]}
                        >
                            {titlePartition.partition2Component}
                        </View>
                    )}
                </View>
            </View>
        );
    }

    /* Renders the poster section with place holder image and preview on card.*/
    renderPosterSection() {
        Logger.log("renderPosterSection");
        return (
            <View style={[{ width: this.size.width }]}>
                <MFCardImage {...this.props} size={this.size} isFocused={this.state.isFocused} />
            </View>
        );
    }

    /* Renders the title section on top of poster image by overlying the metaInfo container on card.*/
    renderTitleOverlayOnPosterSection() {
        Logger.log("renderTitleOverlayOnPosterSection");
        return (
            <View style={[{ width: this.size.width }]}>
                <MFCardImage {...this.props} size={this.size} isFocused={this.state.isFocused}>
                    {this.renderTitleSection()}
                    {this.props.children}
                </MFCardImage>
            </View>
        );
    }

    render() {
        let cardScaleOnSelected: number = 1,
            scaleTransformation = null;
        const { activeMode, activeCardStyle, style, isFocused } = this.props;

        /** Checks for amount of Scale for card in active state.
         * IF active mode is set to 'scale' and cardScaleOnSelected is not specifed,
         * it picks the defalut values specified
         */
        if (activeMode && activeMode.mode === "scale") {
            if (activeMode.cardScaleOnSelected) {
                if (cardScaleOnSelected > 1 || cardScaleOnSelected < 0) {
                    throw new Error(
                        `E1002 cardScaleOnSelected ${cardScaleOnSelected} is invalid it must be between 0 to 1, applying default scale.`
                    );
                } else {
                    cardScaleOnSelected = cardScaleOnSelected + activeMode.cardScaleOnSelected;
                }
            } else {
                cardScaleOnSelected = cardScaleOnSelected + DefaultThemeStyles.CardScaleOnSelected;
            }
            scaleTransformation = this.props.activeMode &&
                this.props.activeMode.mode === "scale" && {
                    transform: [
                        {
                            scale: this.animatedValue.interpolate({
                                inputRange: [0.1, 0.99],
                                outputRange: [1, cardScaleOnSelected],
                            }),
                        },
                    ],
                };
        }
        /***** */

        this.size = this.calculateSize();
        // const titleContainerStyles = StyleSheet.flatten(this.props.titleContainerStyle);
        // const titleContainerHeight = titleContainerStyles.height ?	titleContainerStyles.height :	this
        const blendedCardStyles = [
            libStyles.itemContainer,
            this.state.isFocused ? StyleSheet.flatten([style, activeCardStyle]) : style,
            scaleTransformation,
            this.state.isFocused ? { zIndex: 10 } : null,
            activeMode && activeMode.mode === "border"
                ? this.state.isFocused
                    ? StyleSheet.flatten([activeMode.borderStyles, activeMode.activeBorderStyles])
                    : activeMode.borderStyles
                : null,
            // this.size,
            { width: this.size.width },
        ];

        const hasTVPreferredFocus = isFocused !== undefined ? isFocused : false;
        const metaInfoPosition = this.props.metaInfoPosition !== undefined ? this.props.metaInfoPosition : "bottom";

        Logger.log("Rendering Card with props", this.props);
        const parallaxEffectOniOS = activeMode && activeMode.mode === "scale" ? false : true;
        const MFTouchableOpacity = () => (
            <TouchableOpacity
                activeOpacity={MediaFirst.getMediaFirstConfig().deviceType == "TV" ? 1 : 0.9}
                onFocus={Platform.OS !== "web" ? this._onFocus.bind(this) : () => {}}
                onBlur={Platform.OS !== "web" ? this._onBlur.bind(this) : () => {}}
                onPressIn={this._onFocus.bind(this)}
                onPressOut={this._onBlur.bind(this)}
                onLongPress={this._onInfoPressed.bind(this)}
                onPress={this._onPress.bind(this)}
                tvParallaxProperties={{
                    enabled: parallaxEffectOniOS,
                }}
                ref={this.coverPosterRef}
            >
                {metaInfoPosition === "overlay" ? this.renderTitleOverlayOnPosterSection() : null}
                {metaInfoPosition === "top"
                    ? this.renderTitleSection()
                    : metaInfoPosition !== "overlay" && this.renderPosterSection()}
                {metaInfoPosition === "top"
                    ? this.renderPosterSection()
                    : metaInfoPosition !== "overlay" && this.renderTitleSection()}
            </TouchableOpacity>
        );

        return (
            <Animated.View style={blendedCardStyles}>
                {React.cloneElement(MFTouchableOpacity(), {
                    onMouseEnter: this._onFocus.bind(this),
                    onMouseLeave: this._onBlur.bind(this),
                })}
            </Animated.View>
        );
    }
}
const libStyles = MediaFirstCardStyles;

MFCard.defaultProps = {
    _displayName: "MediaFirstCard",
};
export default MFCard;
