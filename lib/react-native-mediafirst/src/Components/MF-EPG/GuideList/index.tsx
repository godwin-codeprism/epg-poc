import React, { ReactNode } from "react";
import { View, FlatList, Text, TextStyle, StyleSheet, ImageSourcePropType, ViewStyle, ImageStyle } from "react-native";
import ChannelRow from "./ChannelRow";
import ChannelBlock from "./ChannelBlock";
import TimeLine from "../TimeLine";
import WhichDay from "../TimeLine/WhichDay";

interface GuideListProps {
    Channels: ReadonlyArray<any>;
    guideListStyle: ViewStyle;

    rowHeaderStyle: ViewStyle;

    rowStyle?: ViewStyle;

    gapBwTwoChRows: string | number;

    /** For Channel block  */
    channelBlockStyle: ViewStyle;
    channelNumberTextStyle: ViewStyle;
    channelNameTextStyle: ViewStyle;
    chNameTextMaxWidth: number | string;
    channelRowHeaderWidth: string | number;
    channelBlockExpansionStyle: ViewStyle;
    channelExpImageBlk: ViewStyle;
    channelExpImg: ImageStyle;
    defaultShowImage: ImageSourcePropType;
    expandedViewHeight: string | number;

    channelLogoStyle: ImageStyle;
    defaultChannelLogoSrc: ImageSourcePropType;

    /** For Shows Row */
    showsRowContainer: ViewStyle;
    channelRowHeight: string | number;

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
    onPlay: () => void ;
    onRecord: () => void;
    onInfoClick: () => void;
    recordButtonIcon: ImageSourcePropType;
    watchLiveButtonIcon: ImageSourcePropType;
    infoButtonIcon: ImageSourcePropType;

    /** TimeLine */
    timelineRowStyle: ViewStyle;
    timeBlockStyle: ViewStyle;
    timeTextStyle: TextStyle;
    timeLineHeight: number | string;
    timeBlockWidth: number;
    dayOptions: Array<{ label: string; value: string}>;

    /** Which Day */
    whichDayContainer: ViewStyle,
    pickerStyle: ViewStyle;

    fetchData: () => void;
};

interface GuildeListState {
    expandedChannelNumber: string | null;
    currentShowImage: string;
}

let timeFunc: any;
export const debounce = (func: () => void, delay: number) => {
    return function() {
        clearTimeout(timeFunc);
        timeFunc = setTimeout(() => func.apply(this, arguments), delay);
    };
};

class GuideList extends React.PureComponent<GuideListProps> {
    static defaultProps: Object;
    stickyTimeline: TimeLine | null = null;

    state = {
        expandedChannelNumber: null,
        currentShowImage: null,
        loadMore: true,
    };

    childScrollOffset = 0;

    verticalScrollOffset = 0;

    get horizontalScrollOffset() {
        return this.childScrollOffset;
    }

    viewShowDetails = (channelNumber: string | null, imageUri: string) => {
        const { expandedChannelNumber } = this.state;
        this.setState({
            expandedChannelNumber: channelNumber,
            currentShowImage: imageUri,
        });
    };

    _keyExtractor = (i: any, x: number) => i.toString();

    fetchingMoreData = () => {
        const { fetchData, Channels } = this.props;
        fetchData();
        this.setState(
            {
                loadMore: false,
            },
            debounce(() => this.activateLoadMore(), 1000)
        );
    };

    activateLoadMore = () => {
        this.setState({
            loadMore: true,
        });
    };

    render() {
        const {
            Channels,
            channelRowHeight,
            timeLineHeight,
            channelRowHeaderWidth,
            expandedViewHeight,
            defaultChannelLogoSrc,
            defaultShowImage,
            recordButtonIcon,
            watchLiveButtonIcon,
            infoButtonIcon,
            dayOptions,
            onPlay,
            onRecord,
            onInfoClick,
            timeBlockWidth,
            gapBwTwoChRows,
            channelBlockStyle,
            chNameTextMaxWidth,
            channelLogoStyle,
            channelBlockExpansionStyle,
            channelExpImageBlk,
            channelExpImg,
            channelNumberTextStyle,
            channelNameTextStyle,
            showsRowContainer,
            chRowExpansionStyle,
            noShowBlockStyle,
            noShowTextStyle,
            showBlockStyle,
            showTextStyle,
            gapBwTwoShows,
            showDetailsContainer,
            showDetailsNameRow,
            showLabelStyle,
            showLabelTextStyle,
            showNameStyle,
            showDetailsStyle,
            showDescStyle,
            chActionsViewStyle,
            progressBarViewStyle,
            showDetailsViewStyle,
            showActionsViewStyle,
            progressBarStyle,
            progressStyle,
            actionButtonHeight,
            actionButtonStyle,
            actionLabelStyle,
            actionIconStyle,
            timelineRowStyle,
            timeTextStyle,
            timeBlockStyle,
            whichDayContainer,
            pickerStyle
        } = this.props;
				const { expandedChannelNumber, currentShowImage, loadMore } = this.state;
        return (
            <View style={styles(this.props).container}>
                <FlatList
                    style={{ flex: 1 }}
                    data={new Array(1).fill("Parent Flatlist")}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.5}
                    onEndReached={({ distanceFromEnd }) => {
                        if (loadMore && distanceFromEnd > 0) {
                            this.fetchingMoreData();
                        }
                    }}
                    ListHeaderComponent={
                        <View style={{ flexDirection: 'row' }}>
                            <WhichDay
                                height={timeLineHeight}
                                width={channelRowHeaderWidth}
                                dayOptions={dayOptions}
                                whichDayContainer={whichDayContainer}
                                pickerStyle={pickerStyle}
                            />
                            <TimeLine
                                timeSlotWidth={timeBlockWidth}
                                height={timeLineHeight}
                                ref={(t) => {
                                    this.stickyTimeline = t;
                                }}
                                timeBlockStyle={timeBlockStyle}
                                timeTextStyle={timeTextStyle}
                                timelineRowStyle={timelineRowStyle}
                            />
                        </View>
                    }
                    stickyHeaderIndices={[0]}
                    renderItem={() => (
                        <React.Fragment>
                            <FlatList
                                data={new Array(1).fill("Child Flatlist")}
                                keyExtractor={this._keyExtractor}
                                horizontal
                                onScroll={({ nativeEvent }) => {
                                    if (this.state.expandedChannelNumber) {
                                        this.viewShowDetails(null, "");
                                    }
                                    this.childScrollOffset = nativeEvent.contentOffset.x;
                                    this.stickyTimeline &&
                                        this.stickyTimeline.updatetimeLine(Math.round(nativeEvent.contentOffset.x));
                                }}
                                renderItem={() => (
                                    <View style={styles(this.props).rowStyle}>
                                        {Channels.map((ch) => (
                                            <ChannelRow
                                                showsRowContainer={showsRowContainer}
                                                gapBwTwoChRows={gapBwTwoChRows}

                                                chRowExpansionStyle={chRowExpansionStyle}

                                                noShowBlockStyle={noShowBlockStyle}
                                                gapBwTwoShows={gapBwTwoShows}
                                                noShowTextStyle={noShowTextStyle}
                                                channelNumber={ch.ChannelNumber}
                                                height={channelRowHeight}
                                                key={ch.ChannelNumber}
                                                shows={ch.shows}
                                                expand={expandedChannelNumber === ch.ChannelNumber}
                                                onShowSelect={(imageUri: string) =>
                                                    this.viewShowDetails(ch.ChannelNumber, imageUri)
                                                }
                                                detailPos={this.horizontalScrollOffset}
                                                expandedViewHeight={expandedViewHeight}

                                                actionButtonHeight={actionButtonHeight}
                                                actionButtonStyle={actionButtonStyle}
                                                actionLabelStyle={actionLabelStyle}
                                                actionIconStyle={actionIconStyle}
                                                recordButtonIcon={recordButtonIcon}
                                                infoButtonIcon={infoButtonIcon}
                                                onRecord={onRecord}     
                                                onInfoClick={onInfoClick}

                                                timeBlockWidth={timeBlockWidth}
                                                showBlockStyle={showBlockStyle}
                                                showTextStyle={showTextStyle}

                                                showDetailsContainer={showDetailsContainer}
                                                showDetailsNameRow={showDetailsNameRow}
                                                showLabelStyle={showLabelStyle}
                                                showLabelTextStyle={showLabelTextStyle}
                                                showNameStyle={showNameStyle}
                                                showDetailsStyle={showDetailsStyle}
                                                showDescStyle={showDescStyle}
                                                progressBarViewStyle={progressBarViewStyle}
                                                showDetailsViewStyle={showDetailsViewStyle}    
                                                showActionsViewStyle={showActionsViewStyle} 
                                                
                                                progressBarStyle={progressBarStyle}
                                                progressStyle={progressStyle}
                                            />
                                        ))}
                                    </View>
                                )}
                            />
                            {
                                <View style={styles(this.props).rowHeaderStyle}>
                                    {
                                        Channels.map((ch) => (
                                            <ChannelBlock
                                                key={ch.ChannelNumber}

                                                width={channelRowHeaderWidth}
                                                height={channelRowHeight}
                                                channelBlockStyle={channelBlockStyle}
                                                gapBwTwoChRows={gapBwTwoChRows}

                                                channelNumber={ch.ChannelNumber}
                                                channelNumberTextStyle={channelNumberTextStyle}

                                                channelName={ch.Name}
                                                channelNameTextStyle={channelNameTextStyle}                                              
                                                chNameTextMaxWidth={chNameTextMaxWidth}

                                                channelLogoStyle={channelLogoStyle}
                                                defaultChannelLogoSrc={defaultChannelLogoSrc}
                                                channelImage={ch.Images[0] !== undefined ? ch.Images[0].Uri : ''}
                                                channelExpImg={channelExpImg}

                                                currentShowImage={currentShowImage}
                                                channelBlockExpansionStyle={channelBlockExpansionStyle}
                                                channelExpImageBlk={channelExpImageBlk}
                                                defaultShowImage={defaultShowImage}

                                                expand={expandedChannelNumber === ch.ChannelNumber}
                                                expandedViewHeight={expandedViewHeight}

                                                chActionsViewStyle={chActionsViewStyle}
                                                actionButtonHeight={actionButtonHeight}
                                                actionButtonStyle={actionButtonStyle}
                                                actionLabelStyle={actionLabelStyle}
                                                actionIconStyle={actionIconStyle}                                                
                                                watchLiveButtonIcon={watchLiveButtonIcon}
                                                onPlay={onPlay}

                                            />
                                    ))}
                                </View>
                            }
                        </React.Fragment>
                    )}
                />
            </View>
        );
    }
}

GuideList.defaultProps = {
    guideListStyle: {
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    rowHeaderStyle: {
        backgroundColor: "black",
    },
    channelRowHeaderWidth: 110,
    timeLineHeight: 50,
    channelRowHeight: 53,
    expandedViewHeight: 200,
    timeBlockWidth: 300,
    gapBwTwoChRows: 2,
    gapBwTwoShows: 2,
    chNameTextMaxWidth: '70%'
};

const styles = (props: GuideListProps) =>
    StyleSheet.create({
        container: props.guideListStyle,
        rowHeaderStyle: {
            ...props.rowHeaderStyle,
            width: props.channelRowHeaderWidth,
            position: "absolute",
            top: 0,
            left: 0,
        },
        rowStyle: {
            ...props.rowStyle,
            flex: 1,
            paddingLeft: props.channelRowHeaderWidth,
            flexDirection: "column",
        }
    });

export default GuideList;
