import {
    ImageResizeMode,
    ImageSourcePropType,
    ImageStyle,
    ImageURISource,
    StyleProp,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from "react-native";
import { ReactElement } from "react";
export type AspectRatio = "16:9" | "4:3" | "3:4" | "2:3" | "1:1";
export type MetaInfoPosition = "top" | "bottom" | "overlay";
export type TextEllipsizeMode = "tail" | "head" | "middle" | "clip";
export interface MFCardTitlePartition {
    partitionRatio: string;
    partition2Component: ReactElement;
    partition1Styles?: ViewStyle;
    partition2Styles?: ViewStyle;
}

export type ActiveMode =
    | {
          /** Mode can be set either to 'scale' or 'border'. When using activeMode - mode is a required property*/
          mode: "scale";
          /** When mode is set to 'scale', you can provide number between 0 - 1*/
          cardScaleOnSelected?: number;
      }
    | {
          /** Mode can be set either to 'scale' or 'border'. When using activeMode - mode is a required property*/
          mode: "border";
          borderStyles: {
              borderBottomColor?: string;
              borderBottomEndRadius?: number;
              borderBottomLeftRadius?: number;
              borderBottomRightRadius?: number;
              borderBottomStartRadius?: number;
              borderBottomWidth?: number;
              borderColor?: string;
              borderEndColor?: string;
              borderLeftColor?: string;
              borderLeftWidth?: number;
              borderRadius?: number;
              borderRightColor?: string;
              borderRightWidth?: number;
              borderStartColor?: string;
              borderStyle?: "solid" | "dotted" | "dashed";
              borderTopColor?: string;
              borderTopEndRadius?: number;
              borderTopLeftRadius?: number;
              borderTopRightRadius?: number;
              borderTopStartRadius?: number;
              borderTopWidth?: number;
              borderWidth?: number;
          };
          activeBorderStyles?: {
              borderBottomColor?: string;
              borderBottomEndRadius?: number;
              borderBottomLeftRadius?: number;
              borderBottomRightRadius?: number;
              borderBottomStartRadius?: number;
              borderBottomWidth?: number;
              borderColor?: string;
              borderEndColor?: string;
              borderLeftColor?: string;
              borderLeftWidth?: number;
              borderRadius?: number;
              borderRightColor?: string;
              borderRightWidth?: number;
              borderStartColor?: string;
              borderStyle?: "solid" | "dotted" | "dashed";
              borderTopColor?: string;
              borderTopEndRadius?: number;
              borderTopLeftRadius?: number;
              borderTopRightRadius?: number;
              borderTopStartRadius?: number;
              borderTopWidth?: number;
              borderWidth?: number;
          };
      };
export type Visibility = "show" | "hide";
export interface MFCardProps {
    /* aspectRatio is used to calculate the card size based on provided height or width. There are 5 types of aspectRatio's 4:3, 3:4, 2:3, 16:9, and 1:1 available, By default 16:9 aspectRatio will be considered if none of the aspectRatio is provided to the card props.*/
    aspectRatio: AspectRatio;
    /* metaInfoPosition is used to align the title and subtitle container component on the card. There are three types of metaInfoPosition's top, bottom, overlay.
    "top": aligns the container at top of the card. 
    "bottom": aligns the container at bottom of the card.
    "overlay": aligns the container at bottom on poster image.
    */
    metaInfoPosition?: MetaInfoPosition;
    /* Card height will be used to set poster image height and remaining card height will adjusted based on metainfo components height. By default height will be 180
     */
    height?: number;
    /* Card width will be used to set the entire card width. By default width will be calculated based on the aspectRatio and height.
     */
    width?: number;
    /* An index prop to card position to identify in filmstrip when focused or pressed.
     */ 
    index?: number;
    /* A title for the card.
     */
    title: string;
    /* A subtitle for the card.
     */
    subtitle?: string;
    /* The card selection feedback or notification when selected scale or border effect is applied. By default none is applied.
     */
    activeMode?: ActiveMode;
    /* Visibility configuration prop to show or hide the progressbar on card.
     */
    showProgressBar?: Visibility;
    /* Card border width when activeMode is border.
     */
    progressBarTintColor?: string;
    /* Card progress bar background color.
     */
    progressBarBgColor?: string;
    /* Card style to change alignment and  size of the card when used as individual or outside the filmstrip.
     */
    style?: StyleProp<ViewStyle>;
    /* Card poster image style.
     */
    posterImageStyle?: ViewStyle;
    /* Card title style.
     */
    titleStyle?: StyleProp<TextStyle>;
    /* Card subtitle style.
     */
    subtitleStyle?: StyleProp<TextStyle>;
    /* Card title container style can be used to change the alignment or postion of the title and subtitle container on the card.
     */
    titleContainerStyle?: ViewStyle;
    /* A style to change badge icon alignment on the card.
     */
    badgeIconStyle?: StyleProp<ImageStyle>;
    /* A style to change info icon alignment on the card.
     */
    infoButtonStyle?: StyleProp<ImageStyle>;
    /* A style to change action icon alignment on the card.
     */
    actionButtonStyle?: StyleProp<ImageStyle>;
    /* Card progress bar style.
     */
    progressBarStyle?: ViewStyle;
    /* A style to change badgeIcon alignment on the card.
     */
    badgeIconContainerStyle?: StyleProp<ViewStyle>;
    /* A style to change infoButtonStyle alignment on the card.
     */
    infoButtonContainerStyle?: StyleProp<ViewStyle>;
    /* A style to change actionButtonStyle alignment on the card.
     */
    actionButtonContainerStyle?: StyleProp<ViewStyle>;
    /* cardScaleOnSelected is used to change the default scale effect of 0.1 on the focused card.
     */

    /* titleNumOfLines is used to change title’s number of lines.
     */
    titleNumOfLines?: number;
    /* subtitleNumOfLines is used to change subtitle’s number of lines.
     */
    subtitleNumOfLines?: number;
    /* A progress percentage for the progress bar on the card. progress percentage can be "0%"-"100%" asstring value.
     */
    progress?: string;
    /* titleEllipsizeMode is to indicate more text dots position in the title text. Note ellipsize all modes will only work when the text component text no of lines are restricted to one line, else ellipsize mode will apply "tail" mode. There are four types of ellipsize modes available tail, head, middle, clip */
    titleEllipsizeMode?: TextEllipsizeMode;
    /* subtitleEllipsizeMode is to indicate more text dots position in the subtitle text. Note ellipsize all modes will only work when the text component text no of lines are restricted to one line, else ellipsize mode will apply "tail" mode. There are four types of ellipsize modes available tail, head, middle, clip.*/
    subtitleEllipsizeMode?: TextEllipsizeMode;
    /* imageResizeMode is used to apply Image component resize mode to poster, placeholder and preview image's resize mode. There are five types of resizeMode's cover, contain, stretch, repeat, center available.
     */
    imageResizeMode?: ImageResizeMode;
    /* An imageUrl can be a URI or local asset file, a similar source type of react-native Image component.
     */
    imgURL: ImageSourcePropType;
    /* placeHolderImgSource is used to display the image inplace of original image, when the image source is being loaded. Note it is recommended to pass the local image URI path to placeHolderImgSource.
     */
    placeHolderImgSource: ImageSourcePropType;
    /**
     * An image source, to render action button.
     */
    actionButtonIcon?: ImageSourcePropType;
    /**
     * An image source, to render info button.
     */
    infoButtonIcon?: ImageSourcePropType;
    /**
     * An image source, to render badge icon.
     */
    badgeIcon?: ImageSourcePropType;
    /**
     * A style for the card when card is selected or focused.
     */
    activeCardStyle?: StyleProp<ViewStyle>;
    /**
     * A source image uri of card data which is a Image or GIF for the card when card is selected or focused.
     */
    previewSource?: ImageSourcePropType;
    /**
     * isFocused is used to request card focus, when passed as true.
     */
    titlePartition?: MFCardTitlePartition;

    isFocused?: boolean;

    /** If Media first card is inside Film Strip, using this method will return the reference of it's direct parent FilmStip.
     *  Developed for inter Library us.
     *  Not recommended for users to use this mentod
     */
    getParentFilmStrip?(): ReactElement;

    /* Called with the index prop of the card, when card is long pressed. */
    onInfoPressed?(index?: number): void;
    /* Called with the index prop of the card, when card is lost the focused. */
    // onBlur?: (index: number) => void,
    /* Called with the index prop of the card, when card is focused. */
    onFocus(index?: number): void;
    /* Called with the index prop of the card, when card obtains click. */
    onPress(event?: number): void;
    /**
     * _displayName is for internal use only
     */
    _displayName?: string;

    toggleBreatingSpaceLeft?: (toggle: boolean) => void;

    toggleBreatingSpaceRight?: (toggle: boolean) => void;
  
    itemIndex?: number;

    dataLength?: number;

    borderWidth?: number;

    borderColor?: string;

    borderColorOnActive?: string;

}
