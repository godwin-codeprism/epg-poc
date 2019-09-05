import { StyleProp, TextStyle, ViewStyle, ImageStyle, ImageSourcePropType, View } from "react-native";
import { ReactComponentElement } from "react";

export interface MFEPGProps {
    /**
     *  Array of Channels with Shows Schedule.
     */
    Channels: ReadonlyArray<any>;
    /**
     *  Method to fetch more Channels -- Lazy Loading.
     */
    fetchData: () => void;
    /**
     * A Channel Default Icon.
     */
    defaultChannelLogoSrc: ImageSourcePropType;
    /**
     * A Show Default Image.
     */
    defaultShowImage: ImageSourcePropType;
    /**
     * A Record Icon.
     */
    recordButtonIcon: ImageSourcePropType;
    /**
     * A Watch Live Default Image.
     */
    watchLiveButtonIcon: ImageSourcePropType;
    /**
     * A Info Default Image.
     */
    infoButtonIcon: ImageSourcePropType;
    /**
     * Method for On Play.
     */
    onPlay: () => void;
    /**
     * Method for On Record.
     */
    onRecord: () => void;
    /**
     * Method for On Get Information.
     */
    onInfoClick: () => void ;
    /**
     * Options of Dates
     */
    dayOptions: Array<{ label: string; value: string }>; 
    /**
     * height of expanded View
     */
    expandedViewHeight: string | number;
    /**
     * Style of Guide List
     */
    guideListStyle: ViewStyle;
    /**
     * Style of Header of Row (container of channel block)
     */
    rowHeaderStyle: ViewStyle;
    /**
     * Style of Row View (container of channel Row containing shows)
     */
    rowStyle?: ViewStyle;
    /**
     * Width of the channel Block
     */
    channelRowHeaderWidth: string | number;
    /**
     * Height of the time line
     */
    timeLineHeight: string | number;
    /**
     * Height of each Channel Row
     */
    channelRowHeight: string | number;
    /**
     *  width equivalent to 30 minutes ( each time block)
     */
    timeBlockWidth: number;

    /** For Channel block  */
    channelBlockStyle: ViewStyle;
    channelNumberTextStyle: ViewStyle;
    channelNameTextStyle: ViewStyle;
    /** For Determining Ellipsis extension */
    chNameTextMaxWidth: number | string;

    channelBlockExpansionStyle: ViewStyle;
    channelExpImageBlk: ViewStyle;
    channelExpImg: ImageStyle;
    /** ChannelLogoStyle */
    channelLogoStyle: ImageStyle;

    /** For Shows Row */
    showsRowContainer: ViewStyle;

    chRowExpansionStyle: ViewStyle;

    /** Show Block */
    gapBwTwoShows: number | string;
    showBlockStyle: ViewStyle;
    showTextStyle: ViewStyle;

    /** No Show Block */
    noShowBlockStyle: ViewStyle;
    noShowTextStyle: ViewStyle;

    /**  Show Details */
    showDetailsContainer: ViewStyle;
    showDetailsNameRow: ViewStyle;
    showLabelStyle: ViewStyle;
    showLabelTextStyle: ViewStyle;
    showNameStyle: ViewStyle;
    showDetailsStyle: ViewStyle;
    showDescStyle: ViewStyle;
    progressBarViewStyle: ViewStyle;
    showDetailsViewStyle: ViewStyle;
    showActionsViewStyle: ViewStyle;
    chActionsViewStyle: ViewStyle;

    /**ProgressBar */
    progressBarStyle: ViewStyle;
    progressStyle: ViewStyle;

    /** Actions  */
    actionButtonHeight: number | string;
    actionButtonStyle: ViewStyle;
    actionLabelStyle: ViewStyle;
    actionIconStyle: ImageSourcePropType;


    /** TimeLine */
    timelineRowStyle: ViewStyle;
    timeBlockStyle: ViewStyle;
    timeTextStyle: TextStyle;

    /** Which Day */
    whichDayContainer: ViewStyle;

    pickerStyle: ViewStyle;

    /** gap Between two consecutive rows */
    gapBwTwoChRows: string | number;
}
