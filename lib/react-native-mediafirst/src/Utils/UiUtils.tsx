import { Size } from "./Size";
import { DefaultThemeStyles } from "../styles";
import { Logger } from "./Logger";

export const ASPECTRATIO_16_9 = "16:9";
export const ASPECTRATIO_4_3 = "4:3";
export const ASPECTRATIO_3_4 = "3:4";
export const ASPECTRATIO_2_3 = "2:3";
export const ASPECTRATIO_1_1 = "1:1";

export const CARD_HEIGHT_16_9 = 120;
export const CARD_WIDTH_16_9 = (CARD_HEIGHT_16_9 * 16) / 9;

export const CARD_HEIGHT_4_3 = 120;
export const CARD_WIDTH_4_3 = (CARD_HEIGHT_4_3 * 4) / 3;

export const CARD_HEIGHT_3_4 = 120;
export const CARD_WIDTH_3_4 = (CARD_HEIGHT_3_4 * 3) / 4;

export const CARD_HEIGHT_2_3 = 120;
export const CARD_WIDTH_2_3 = (CARD_HEIGHT_2_3 * 2) / 3;

export const CARD_WIDTH_1_1 = 120;
export const CARD_HEIGHT_1_1 = 120;

export const CARD_STOCK_DIMENTIONS = {
    "16:9": {
        width: CARD_WIDTH_16_9,
        height: CARD_HEIGHT_16_9,
    },
    "4:3": {
        width: CARD_WIDTH_4_3,
        height: CARD_HEIGHT_4_3,
    },
    "3:4": {
        width: CARD_WIDTH_3_4,
        height: CARD_HEIGHT_3_4,
    },
    "2:3": {
        width: CARD_WIDTH_3_4,
        height: CARD_HEIGHT_3_4,
    },
    "1:1": {
        width: CARD_WIDTH_3_4,
        height: CARD_HEIGHT_3_4,
    },
};

export const CARD_SCALE_ANIMATION_DURATION_SHORT = 200;
export const CARD_SCALE_ANIMATION_DURATION_MED = 400;
export const CARD_SCALE_ANIMATION_DURATION_LONG = 500;

export const CARD_SCALE_ON_SELECTED = 0.15;

export const getDefaultSize = (aspectRatio?: string):Size => {
    const size: Size = { width: CARD_WIDTH_16_9, height: CARD_HEIGHT_16_9 };
    Logger.log("CardSize size:: ", size, " aspectRatio:: ", aspectRatio);
    switch (aspectRatio) {
        case ASPECTRATIO_16_9:
            size.height = DefaultThemeStyles.CardHeight_16_9;
            size.width = (size.height * 16) / 9;
            break;
        case ASPECTRATIO_4_3:
            size.height = DefaultThemeStyles.CardHeight_4_3;
            size.width = (size.height * 4) / 3;
            break;
        case ASPECTRATIO_3_4:
            size.height = DefaultThemeStyles.CardHeight_3_4;
            size.width = (size.height * 3) / 4;
            break;
        case ASPECTRATIO_2_3:
            size.height = DefaultThemeStyles.CardHeight_2_3;
            size.width = (size.height * 2) / 3;
            break;
        case ASPECTRATIO_1_1:
            size.width = DefaultThemeStyles.CardHeight_1_1;
            size.height = size.width;
            break;
        default:
            if (DefaultThemeStyles.CardAspectRatio) {
                Logger.log("DefaultThemeStyle.defualtCardAspectRatio is defined");
                return getDefaultSize(DefaultThemeStyles.CardAspectRatio);
            }
            Logger.log("DefaultThemeStyle.defualtCardAspectRatio is undefined using default aspectRatio 16:9");
            return getDefaultSize(ASPECTRATIO_16_9);
    }
    return size;
};
