import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType, ViewStyle, TextStyle } from 'react-native';
import ShowDetails from './ShowDetails';
import ShowBlock from './ShowBlock';
import NoShowBlock from './NoShowBlock';

interface State {
}

interface ChannelRowProps {
    showsRowContainer: ViewStyle;
    gapBwTwoChRows: number | string;
    height: string | number;

    channelNumber: string;

    expand: boolean;
    expandedViewHeight: string | number;
    chRowExpansionStyle: ViewStyle;

    noShowBlockStyle: ViewStyle;
    gapBwTwoShows: number | string;
    noShowTextStyle: ViewStyle;

    showBlockStyle: ViewStyle;
    showTextStyle: ViewStyle;

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

    /**ProgressBar */
    progressBarStyle: ViewStyle;
    progressStyle: ViewStyle;

    /** Actions */
    actionButtonHeight: number | string;
    actionButtonStyle: ViewStyle;
    actionLabelStyle: ViewStyle;
    actionIconStyle: ImageSourcePropType;

    shows: Array<{[key: string]: string}>;
    key: string;
    onShowSelect: (uri: string) => void;
    detailPos: number;
    recordButtonIcon: ImageSourcePropType;
    infoButtonIcon: ImageSourcePropType;
    onRecord: () => void;
    onInfoClick: () => void;
    timeBlockWidth: number;
    
}

interface ChannelRowState {
    currentShowName: string;
    timeLength: string;
    startEnd: string;
    description: string;
    progress: number;
    isNew: boolean;
    isAdult: boolean;
}

class ChannelRow extends React.PureComponent<ChannelRowProps, ChannelRowState> {
    static defaultProps: Object;

    state = {
        currentShowName: '',
        timeLength: '',
        startEnd: '',
        description: '',
        progress: 0,
        isNew: false,
        isAdult: false,
        detailsPosition: 0
    };

    getStartingPoint = (startTimeUTC: string) => {
        const { timeBlockWidth } = this.props;
        const startTime = new Date(startTimeUTC);

        const hourGap = startTime.getUTCHours() * timeBlockWidth * 2;
        const minuteGap = startTime.getUTCMinutes() *  2 * timeBlockWidth / 60;
        return hourGap + minuteGap;
    }

    getWidth = (startTimeUTC: string, endTimeUTC: string) => {
        const { timeBlockWidth } = this.props;
        const startTime = new Date(startTimeUTC);
        const endTime = new Date(endTimeUTC);

        const hourGapS = startTime.getUTCHours() * timeBlockWidth * 2;
        const minuteGapS = startTime.getUTCMinutes() *  2 * timeBlockWidth / 60;
        const SP = hourGapS + minuteGapS;

        const hourGapE = endTime.getUTCHours() * timeBlockWidth * 2;
        const minuteGapE = endTime.getUTCMinutes() *  2 * timeBlockWidth / 60;
        const EP = hourGapE + minuteGapE;
        
        return EP - SP;
    }

    modifyTimeString = (time: number) => {
        const modifiedTime = time > 12 ? time - 12 : time;
        let timeString = modifiedTime.toString();
        if (timeString.length === 1) {
            timeString = '0' + timeString;
        }
        return timeString;
    }

    getTimeSlot = (startTimeUTC: string, endTimeUTC: string) => {
        const startTime = new Date(startTimeUTC);
        const endTime = new Date(endTimeUTC);

        let startString = startTime.getUTCHours() > 12 ? this.modifyTimeString(startTime.getUTCHours() - 12) : this.modifyTimeString(startTime.getUTCHours());
        startString += ':' + this.modifyTimeString(startTime.getUTCMinutes());
        startString += startTime.getUTCHours() > 12 ? 'PM' : 'AM';

        let endString = endTime.getUTCHours() > 12 ? this.modifyTimeString(endTime.getUTCHours() - 12) : this.modifyTimeString(endTime.getUTCHours());
        endString += ':' + this.modifyTimeString(endTime.getUTCMinutes());
        endString += endTime.getUTCHours() > 12 ? 'PM' : 'AM';
        
        return  this.modifyTimeString(startTime.getUTCDate()) + '/' + this.modifyTimeString(startTime.getUTCMonth()) + '/' + startTime.getUTCFullYear() + ', ' + startString + '-' + endString;
    }

    renderExpandedView = (show: {[key: string]: string}) => {
        const { onShowSelect, timeBlockWidth } = this.props;
        let timeLength = this.getWidth(show.StartUtc, show.EndUtc) * 60 / (2 * timeBlockWidth);
        if (timeLength > 59) {
            timeLength = `${Math.floor(timeLength / 60)}Hrs ${timeLength % 60} Mins`;
        } else {
            timeLength += 'Mins'
        }
        
        this.setState({
            currentShowName: show.Name,
            timeLength,
            startEnd: this.getTimeSlot(show.StartUtc, show.EndUtc),
            description: show.Description,
            progress: 20,
            isNew: show.IsNew,
            isAdult: show.IsAdult
        });
        onShowSelect(show.Images !== undefined  && show.Images !== null && show.Images.length > 0 ? show.Images[0].Uri : '');
    } 

    render() {
        const {
            expand,
            shows,
            channelNumber,
            height,
            detailPos,
            recordButtonIcon,
            infoButtonIcon,
            onRecord,
            onInfoClick,
            timeBlockWidth,
            noShowBlockStyle,
            noShowTextStyle,
            gapBwTwoShows,
            showBlockStyle,
            showTextStyle,
            showDetailsContainer,
            showDetailsNameRow,
            showLabelStyle,
            showLabelTextStyle,
            showNameStyle,
            showDetailsStyle,
            showDescStyle,
            progressBarViewStyle,
            showDetailsViewStyle,
            showActionsViewStyle,
            progressBarStyle,
            progressStyle,
            actionButtonHeight,
            actionButtonStyle,
            actionLabelStyle,
            actionIconStyle
        } = this.props;
        const { currentShowName, timeLength, startEnd, description, progress, isNew, isAdult  } = this.state;
        return (
            <React.Fragment>
                <View style={styles(this.props).showsRow}>
                    <NoShowBlock
                        width={shows[0] !== undefined ? this.getStartingPoint(shows[0].StartUtc) : timeBlockWidth * 48}
                        height={height}
                        timeBlockWidth={timeBlockWidth}
                        noShowBlockStyle={noShowBlockStyle}
                        noShowTextStyle={noShowTextStyle}
                        gapBwTwoShows={gapBwTwoShows}
                        pos="START"
                    /> 
                    {
                        shows !== undefined && shows !== null && shows.length > 0 &&
                            (
                            shows.map((show, index) => (
                                index !== 0 && this.getStartingPoint(show.StartUtc) - this.getStartingPoint(shows[index - 1].EndUtc) === 0
                                    ? (
                                <ShowBlock
                                    width={ this.getWidth(show.StartUtc, show.EndUtc)}
                                    height={height}
                                    showName={show.Name}
                                    key={`${channelNumber}-${show.Name}-${index}`}
                                    onPress={() => this.renderExpandedView(show)}
                                    gapBwTwoShows={gapBwTwoShows}
                                    showBlockStyle={showBlockStyle}
                                    showTextStyle={showTextStyle}
                                    leftGapNeeded={!(index === 0 && this.getStartingPoint(show.StartUtc) === 0)}
                                />
                                    ) : (
                                    <React.Fragment key={`${channelNumber}-${show.Name}-${index}`}>
                                        <NoShowBlock
                                            width={index !== 0 ? this.getStartingPoint(show.StartUtc) - this.getStartingPoint(shows[index - 1].EndUtc) : 0}
                                            height={height}
                                            timeBlockWidth={timeBlockWidth}
                                            noShowBlockStyle={noShowBlockStyle}
                                            noShowTextStyle={noShowTextStyle}
                                            gapBwTwoShows={gapBwTwoShows}
                                            pos="MIDDLE"
                                        />
                                        <ShowBlock
                                            width={this.getWidth(show.StartUtc, show.EndUtc)}
                                            height={height}
                                            showName={show.Name}
                                            key={`${channelNumber}-${show.Name}-${index}`}
                                            onPress={() => this.renderExpandedView(show)}
                                            gapBwTwoShows={gapBwTwoShows}
                                            showBlockStyle={showBlockStyle}
                                            showTextStyle={showTextStyle}
                                            leftGapNeeded={!(index === 0 && this.getStartingPoint(show.StartUtc) === 0)}
                                        />
                                    </React.Fragment>
                                    )
                            ))
                        )
                    }
                    <NoShowBlock
                        width={shows[0] !== undefined ? timeBlockWidth * 48 - this.getStartingPoint(shows[shows.length - 1].EndUtc) : 0}
                        height={height}
                        timeBlockWidth={timeBlockWidth}
                        noShowBlockStyle={noShowBlockStyle}
                        noShowTextStyle={noShowTextStyle}
                        gapBwTwoShows={gapBwTwoShows}
                        pos="END"
                    /> 
                </View>
                {
                    expand && (
                        <View style={{ ...styles(this.props).expansionStyle, paddingLeft: detailPos }}>
                            <ShowDetails    
                                showName={currentShowName}
                                timeLength={timeLength}
                                startEnd={startEnd}
                                description={description}
                                progress={progress}
                                isNew={isNew}
                                isAdult={isAdult}

                                actionButtonHeight={actionButtonHeight}
                                actionButtonStyle={actionButtonStyle}
                                actionLabelStyle={actionLabelStyle}
                                actionIconStyle={actionIconStyle}
                                recordButtonIcon={recordButtonIcon}         
                                infoButtonIcon={infoButtonIcon}
                                onRecord={onRecord}
                                onInfoClick={onInfoClick}

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
                        </View>
                    )
                }
            </React.Fragment>
        )
    }
}

ChannelRow.defaultProps = {
    chRowExpansionStyle: {
        backgroundColor: '#4d4d4d',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}

const styles = (props: ChannelRowProps) => StyleSheet.create({
    showsRow: {
        ...props.showsRowContainer,
        height: props.height,
        flexDirection: 'row',
        marginBottom: props.gapBwTwoChRows
    },
    
    expansionStyle: {
        ...props.chRowExpansionStyle,
        height: props.expandedViewHeight,
    }

})

  export default ChannelRow;