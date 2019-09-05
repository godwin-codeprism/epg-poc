import React from "react";
import { Animated, View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity, ViewStyle, ImageStyle} from 'react-native';
import DetailsButton from './detailsButton';

interface ChannelBlockProps {
    height: string | number;
    width: string | number;
    gapBwTwoChRows: number | string;
    channelBlockStyle: ViewStyle;

    channelNumber: string;
    channelNumberTextStyle: ViewStyle;

    channelName: string;
    channelNameTextStyle: ViewStyle;
    chNameTextMaxWidth: number | string;

    channelLogoStyle: ImageStyle;
    channelImage: string | null;
    defaultChannelLogoSrc: ImageSourcePropType;

    expand: boolean;
    expandedViewHeight: number | string;
    channelBlockExpansionStyle: ViewStyle;
    channelExpImageBlk: ViewStyle;
    channelExpImg: ImageStyle;
    currentShowImage: string | null;
    defaultShowImage: ImageSourcePropType;

    chActionsViewStyle: ViewStyle;
    actionButtonHeight: number | string;
    actionButtonStyle: ViewStyle;
    actionLabelStyle: ViewStyle;
    actionIconStyle: ImageSourcePropType;
    watchLiveButtonIcon: ImageSourcePropType;
    onPlay: () => void;
};

interface ChannelBlockState {
    fadeAnim: Object;
}

class ChannelBlock extends React.PureComponent<ChannelBlockProps, ChannelBlockState> {
    static defaultProps: Object;

    state = {
        fadeAnim: new Animated.Value(0),  
    };
    
    componentDidMount() {
        Animated.timing(            
            this.state.fadeAnim,      
            {
                toValue: 1,             
                duration: 2000,        
            }
        ).start();                  
    }

    render() {
        const {
            defaultChannelLogoSrc,
            channelImage,
            channelNumber,
            channelName,
            expand,
            currentShowImage,
            defaultShowImage,
            watchLiveButtonIcon,
            onPlay,
            actionButtonHeight,
            actionButtonStyle,
            actionLabelStyle,
            actionIconStyle
        } = this.props;

        let { fadeAnim } = this.state;

        return (
            <React.Fragment>
                    <View style={styles(this.props).container}>
                        <View style={styles(this.props).logoContainer}>
                            { 
                                channelImage !== undefined && channelImage !== null && channelImage !== '' &&
                                <Image source={{ uri: channelImage }} style={styles(this.props).channelLogoStyle} />
                            }
                            { 
                                (channelImage === undefined || channelImage === null || channelImage === '') &&
                                <Image source={defaultChannelLogoSrc} style={styles(this.props).channelLogoStyle} />
                            }
                        </View>
                        <View style={styles(this.props).nameContainer}>
                            <Text style={styles(this.props).channelNumberTextStyle}>
                                {
                                    channelNumber
                                }
                            </Text>
                            <Text style={styles(this.props).channelNameTextStyle} numberOfLines={1}>
                                {
                                    channelName
                                }
                            </Text>
                        </View>
                    </View>
                {
                    expand && (
                        <View style={styles(this.props).expansionStyle}>
                            <View style={styles(this.props).expansionImageBlkStyle}>
                                { 
                                    currentShowImage !== undefined && currentShowImage !== null && currentShowImage !== '' &&
                                    <Image source={{ uri: currentShowImage }} style={styles(this.props).expansionImageStyle} />
                                }
                                { 
                                    (currentShowImage === undefined || currentShowImage === null || currentShowImage === '') &&
                                    <Image style={styles(this.props).expansionImageStyle} source={defaultShowImage} />
                                }
                            </View>
                            <View style={styles(this.props).chActionsViewStyle}>
                                <DetailsButton
                                    icon={watchLiveButtonIcon}
                                    label="Watch Live"
                                    onPress={onPlay}
                                    actionButtonHeight={actionButtonHeight}
                                    actionButtonStyle={actionButtonStyle}
                                    actionLabelStyle={actionLabelStyle}
                                    actionIconStyle={actionIconStyle}
                                />
                            </View>
                        </View>
                    )
                }
            </React.Fragment>
      )
    }
  } 

ChannelBlock.defaultProps = {
    channelBlockStyle:  {
        backgroundColor: 'black'
    },
    channelNumberTextStyle: {
        fontSize: 15,
        color: 'white',
        fontWeight: '400',
        marginRight: 2
    },
    channelNameTextStyle: {
        fontSize: 15,
        color: 'white',
        fontWeight: '400',
    },
    channelLogoStyle: {
        width: 30,
        height: 30
    },
    channelBlockExpansionStyle: {
        backgroundColor: '#4d4d4d',
        flexDirection: 'column',
        alignItems: 'center'
    },
    channelExpImageBlk: {
        height: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    channelExpImg: {
        width: 90,
        height: '100%',
    },
    chActionsViewStyle: {
        height: 50,
        padding: 10,
    }
};

const styles = (props: ChannelBlockProps) => StyleSheet.create({
    container : {
        ...props.channelBlockStyle,
        height: props.height,
        width: props.width,
        flex: 1,
        flexDirection: 'column',
        marginBottom: props.gapBwTwoChRows
    },
    nameContainer: {
        width: props.width,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    channelNumberTextStyle: props.channelNumberTextStyle,
    channelNameTextStyle: {
        ...props.channelNameTextStyle,
        maxWidth: props.chNameTextMaxWidth
    },
    logoContainer: {
        width: props.width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    channelLogoStyle: props.channelLogoStyle,
    expansionStyle: {
        ...props.channelBlockExpansionStyle,
        height: props.expandedViewHeight,
        width: props.width
    },
    expansionImageBlkStyle: {
        ...props.channelExpImageBlk,
        width: props.width
    },
    expansionImageStyle: props.channelExpImg,
    chActionsViewStyle: props.chActionsViewStyle
});

export default ChannelBlock; 