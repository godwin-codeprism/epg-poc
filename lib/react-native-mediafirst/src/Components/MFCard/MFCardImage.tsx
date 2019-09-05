import React, { Component } from "react";
import { Image, ImageBackground, Platform, View } from "react-native";
import { DefaultThemeStyles, MediaFirstCardStyles } from "../../styles";
import { Logger, Size } from "../../Utils";
import { MFCardProps } from "./MFCardProps";
import PlaceHolderImage from "./PlaceHolderImage";
interface State {
    isFocused?: boolean;
}
interface MFCardImageProps extends MFCardProps {
    size: Size;
    isFocused?: boolean;
    

}
/* MFCardImage with placeholder image support contains progress bar and info, action, badge icons
 */
export default class MFCardImage extends Component<MFCardImageProps, State> {
    initialLoad?: boolean;
    refPlaceHolderImage: React.RefObject<PlaceHolderImage>;
    constructor(props: MFCardImageProps) {
        super(props);
        this.refPlaceHolderImage = React.createRef();
        this.initialLoad = true;
        this.state = {
            isFocused: this.props.isFocused,
        };
    }

    componentWillReceiveProps(nexProps: MFCardImageProps) {
        const { isFocused } = nexProps;
        if (isFocused !== undefined) this.setState({ isFocused: isFocused });
    }

    /* Renders the badge icon with the badgeIcon, badgeIconStyle, badgeIconContainerStyle props.*/
    renderBadgeIcon() {
        const badgeIconStyle = this.props.badgeIconStyle ? this.props.badgeIconStyle : _styles.badgeIconStyle;
        const badgeIconContainerStyle = this.props.badgeIconContainerStyle
            ? this.props.badgeIconContainerStyle
            : _styles.badgeIconContainerStyle;
        return (
            <View style={badgeIconContainerStyle}>
                <Image style={badgeIconStyle} source={this.props && this.props.badgeIcon ? this.props.badgeIcon : {}} />
            </View>
        );
    }
    /* Renders the action icon with the actionIcon, actionIconStyle, actionIconContainerStyle props.*/
    renderActionButton() {
        const actionButtonStyle = this.props.actionButtonStyle
            ? this.props.actionButtonStyle
            : _styles.actionButtonStyle;
        const actionButtonContainerStyle = this.props.actionButtonContainerStyle
            ? this.props.actionButtonContainerStyle
            : _styles.actionButtonContainerStyle;
        return (
            <View style={actionButtonContainerStyle}>
                <Image
                    style={actionButtonStyle}
                    source={this.props && this.props.actionButtonIcon ? this.props.actionButtonIcon : {}}
                />
            </View>
        );
    }
    /* Renders the progressbar using progressbarTintColor, progressBarBgColor, progressBarStyle props. And returns the progressbar view only when showProgressBar is "show". */
    renderProgressBar() {
        Logger.log("rendering progressbar");
        if (!this.props.showProgressBar || this.props.showProgressBar === "hide") {
            return;
        }
        const progressBarTintColor = !this.props.progressBarTintColor
            ? DefaultThemeStyles.progressBarTintColor
            : this.props.progressBarTintColor;
        const progress = !this.props.progress ? "0%" : this.props.progress;
        const progressBarStyle = [
            !this.props.progressBarStyle ? _styles.progressBarStyle : this.props.progressBarStyle,
            { backgroundColor: progressBarTintColor, width: progress },
        ];
        const progressBarBgColor = !this.props.progressBarBgColor
            ? "rgba(128,128,128,0.4)"
            : this.props.progressBarBgColor;
        return (
            <View style={[progressBarStyle, { width: "100%", backgroundColor: progressBarBgColor }]}>
                <View style={progressBarStyle} />
            </View>
        );
    }
    /* Renders the info icon with the infoIcon, infoIconStyle, infoIconContainerStyle props.*/
    renderInfoButton() {
        const infoButtonStyle = this.props.infoButtonStyle ? this.props.infoButtonStyle : _styles.infoButtonStyle;
        const infoButtonContainerStyle = [
            this.props.infoButtonContainerStyle
                ? this.props.infoButtonContainerStyle
                : _styles.infoButtonContainerStyle,
            this.props.metaInfoPosition === "overlay" && { bottom: 50 },
        ];
        return (
            <View style={infoButtonContainerStyle}>
                <Image
                    style={infoButtonStyle}
                    source={this.props && this.props.infoButtonIcon ? this.props.infoButtonIcon : {}}
                />
            </View>
        );
    }
    /* Original image or preview is being loaded, make the placeholder image gone*/
    onLoad(event: Object) {
        if (this.refPlaceHolderImage && this.refPlaceHolderImage !== null && this.refPlaceHolderImage.current !== null)
            this.refPlaceHolderImage.current.changeVisibility(0);
    }
    /* Original image or preview is failed load, make the placeholder image to visible*/
    onError() {
        if (this.refPlaceHolderImage && this.refPlaceHolderImage !== null && this.refPlaceHolderImage.current !== null)
            this.refPlaceHolderImage.current.changeVisibility(1);
    }
    render() {
        const size = this.props.size;
        Logger.log("size:: ", size);
        const posterImageStyle = [
            this.props.posterImageStyle ? this.props.posterImageStyle : _styles.posterImageStyle,
            {
                width: size.width,
                height: size.height,
            },
        ];
        let imageSource = this.props && this.props.imgURL ? this.props.imgURL : {};
        const placeHolderImgSource = this.props.placeHolderImgSource ? this.props.placeHolderImgSource : {};
        let isPreviewSource = false;
        if (this.props.isFocused && this.props && this.props.previewSource) {
            imageSource = this.props.previewSource;
            isPreviewSource = true;
            this.initialLoad = true;
        }

        Logger.log(
            "imageSource::",
            imageSource,
            " isPreviewSource:: ",
            isPreviewSource,
            " this.initialLoad:: ",
            this.initialLoad
        );
        const borderRadiusValue =
            this.props.posterImageStyle && this.props.posterImageStyle.borderRadius
                ? this.props.posterImageStyle.borderRadius
                : _styles.cardBorderStyle && _styles.cardBorderStyle.borderRadius;
        const resizeMode = this.props.imageResizeMode ? this.props.imageResizeMode : "cover";
        let borderRadiusStyle = { borderTopLeftRadius: borderRadiusValue, borderTopRightRadius: borderRadiusValue, borderBottomLeftRadius: 0,  borderBottomRightRadius: 0 };
        if (this.props.metaInfoPosition === "overlay" && this.props.activeMode && this.props.activeMode.mode === "scale") {
            borderRadiusStyle = {
                ...borderRadiusStyle,
                borderBottomLeftRadius: borderRadiusValue,
                borderBottomRightRadius: borderRadiusValue,
            };
        }
        if (Platform.OS === "ios") {
            borderRadiusStyle = { 
                borderTopLeftRadius: borderRadiusValue,
                borderTopRightRadius: borderRadiusValue,
                borderBottomLeftRadius: borderRadiusValue,
                borderBottomRightRadius: borderRadiusValue,
             };
        }
        let borderStyle;
        if (this.props.activeMode && this.props.activeMode.mode === "border") {
            const borderWidth = this.props.borderWidth ? this.props.borderWidth : 2;
            const borderColor = this.props.borderColor ? this.props.borderColor : "white";
            const borderColorOnActive = this.props.borderColorOnActive ? this.props.borderColorOnActive : "red";
            borderStyle = {
                borderLeftWidth: borderWidth,
                borderRightWidth: borderWidth,
                borderLeftColor: this.props.isFocused ? borderColorOnActive : borderColor,
                borderRightColor: this.props.isFocused ? borderColorOnActive : borderColor,
            };
        }
        return (
            <View style={[{ flexDirection: "column" }]}>
                <ImageBackground
                    key={this.props.index}
                    style={[posterImageStyle, Platform.OS === "android" && borderStyle]}
                    imageStyle={[borderRadiusStyle]}
                    source={imageSource}
                    resizeMode={resizeMode}
                    onError={() => {
                        Logger.warn("onError show place holder");
                        this.onError();
                    }}
                    onLoad={(event: Object) => {
                        Logger.log("onLoad hide place holder::");
                        if (!isPreviewSource) this.initialLoad = false;
                        this.onLoad(event);
                    }}
                >
                    {Platform.OS !== "web" && (
                        <PlaceHolderImage
                            resizeMode={resizeMode}
                            opacity={isPreviewSource || this.initialLoad ? 1 : 0}
                            ref={this.refPlaceHolderImage}
                            source={placeHolderImgSource}
                            style={posterImageStyle}
                        />
                    )}
                    {this.renderBadgeIcon()}
                    {this.renderActionButton()}
                    {this.renderInfoButton()}
                    {this.renderProgressBar()}
                </ImageBackground>
                {this.props.children}
            </View>
        );
    }
}

const _styles = MediaFirstCardStyles;
