import { StyleProp, TextStyle, ViewStyle, TouchableOpacityProps } from "react-native";
import { ReactComponentElement } from "react";

export interface MFFilmStripProps<Item> {
    /**
     * A datasource is a plain array of cards.
     */
    datasource: ReadonlyArray<Item> | null;
    /**
     * A title for the filmstrip.
     */
    title: string;
    /**
     * In order to convert the list to grid component provide more than one column.
     */
    numColumns?: number;
    /**
     * horizontal flag is used to make the flatlist as vertical or horizontal.
     */
    horizontal?: boolean;
    /**
     * Filmstrip title style.
     */
    titleStyle?: TextStyle;
    /**
     * A content container style.
     */
    contentContainerStyle?: StyleProp<ViewStyle> | null;
    /**
     * A style for the Filmstrip.
     */
    filmStripContainerStyle?: StyleProp<ViewStyle>;
    /**
     * A flag whether to show the horizontal scroll indicator or not.
     */
    showsHorizontalScrollIndicator?: boolean;
    /**
     * A keyextractor function should return a unique key of each item.
     */
    keyExtractor?: (item: Item, index: number) => string;
    /**
     * A renderItem function is used to render the list item.
     */
    renderItem: (info: renderItemInfo) => ReactComponentElement<any, any>;

    mobileViewAll?: mobileViewAllInterface;
}

interface renderItemInfo {
    item: any;
    index?: number;
}

export interface mobileViewAllInterface {
    enable: boolean;
    viewAllText: string;
    viewAllContainerStyles: StyleProp<ViewStyle>;
    viewAllTextStyles: StyleProp<TextStyle>;
    viewAllTouchableProps?: TouchableOpacityProps;
    onPressViewAll?(): void;
}
