import { StyleSheet, PixelRatio } from "react-native";
import {
    ASPECTRATIO_16_9,
    CARD_HEIGHT_16_9,
    CARD_HEIGHT_1_1,
    CARD_HEIGHT_2_3,
    CARD_HEIGHT_3_4,
    CARD_HEIGHT_4_3,
    CARD_SCALE_ANIMATION_DURATION_LONG,
    CARD_SCALE_ON_SELECTED,
} from "../Utils";

/**
 * A default themes object modifiable by user **/
export const Colors = {
    appThemeColor: "#2196F3",
    cardBgColorOnSelected: "#ED3636",
    transparent: "transparent",
    white: "white",
};

export const DefaultThemeStyles = {
    CardScaleAnimDuration: CARD_SCALE_ANIMATION_DURATION_LONG,
    CardScaleOnSelected: CARD_SCALE_ON_SELECTED,
    CardAspectRatio: ASPECTRATIO_16_9,
    CardHeight_16_9: CARD_HEIGHT_16_9,
    CardHeight_4_3: CARD_HEIGHT_4_3,
    CardHeight_3_4: CARD_HEIGHT_3_4,
    CardHeight_2_3: CARD_HEIGHT_2_3,
    CardHeight_1_1: CARD_HEIGHT_1_1,
    progressBarTintColor: Colors.appThemeColor,
    CardBgColorOnSelected: Colors.cardBgColorOnSelected,
    CardBgColor: Colors.appThemeColor,
};

export const MediaFirstFilmStripStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    topBarContainer: {
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    filmStripTitleContainer: {
        flex: 80,
        justifyContent: "center",
    },
    mobileViewAllContainer: {
        flex: 20,
    },
    title: {
        color: Colors.cardBgColorOnSelected,
        fontSize: 16,
    },
    listStyle: {
        backgroundColor: Colors.transparent,
    },
});

export const MediaFirstCardStyles = StyleSheet.create({
    itemContainer: {
        overflow: "hidden",
    },
    posterImageStyle: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    posterContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyle: {
        margin: 2,
        color: Colors.white,
        textAlign: "left",
        fontSize: 14,
    },
    subtitleStyle: {
        margin: 2,
        color: Colors.white,
        textAlign: "left",
        fontSize: 12,
    },
    infoButtonContainerStyle: {
        position: "absolute",
        left: "0%",
        bottom: "0%",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    infoButtonStyle: {
        height: 24,
        width: 36,
    },
    actionButtonStyle: {
        height: 24,
        width: 24,
    },
    actionButtonContainerStyle: {
        position: "absolute",
        left: "47%",
        top: "50%",
    },
    badgeIconStyle: {
        height: 24,
        width: 24,
    },
    badgeIconContainerStyle: {
        position: "absolute",
        marginTop: 10,
    },
    progressBarStyle: {
        position: "absolute",
        width: "40%",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "red",
        flexDirection: "row",
        height: 5,
    },
    cardBorderStyle: {
        borderRadius: 0
    }
});
