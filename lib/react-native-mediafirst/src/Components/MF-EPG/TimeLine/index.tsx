import * as React from "react";
import { View, StyleSheet, FlatList, Text, ScrollView, ViewStyle, TextStyle } from "react-native";
import TimeBlock from "./TimeBlock";

const timeSlotGap = 30; // in Minutes

interface TimeLineProps {
    timelineRowStyle: ViewStyle;
    timeBlockStyle: ViewStyle;
    timeTextStyle: TextStyle;
    timeSlotWidth: number | string;
    height: string | number;
}

interface TimeLineState {
    timeSlots: Array<string>;
}

class TimeLine extends React.Component<TimeLineProps, TimeLineState> {
    static defaultProps: Object;
    stickyScroll: ScrollView | null = null;

    state = {
        timeSlots: [],
    };

    modifyMinuteString = (minutes: number) => {
        let minuteString = minutes.toString();
        if (minuteString.length === 1) {
            minuteString = "0" + minuteString;
        }
        return minuteString;
    };

    modifyHourString = (hours: number) => {
        const modifiedHours = hours > 12 ? hours - 12 : hours;
        let hourString = modifiedHours.toString();
        if (hourString.length === 1) {
            hourString = "0" + hourString;
        }
        return hourString;
    };

    getMeridiem = (hours: number) => {
        if (hours > 12) {
            return "PM";
        } else return "AM";
    };

    updatetimeLine = (xPos: number) => {
        this.stickyScroll && this.stickyScroll.scrollTo({ x: xPos, y: 0, animated: false });
    };

    getTimeSlots = () => {
        const { timeSlots } = this.state;

        //start time
        let startHour = 0;
        let startMinute = 0;
        if (timeSlotGap !== undefined) {
            while (startHour < 24) {
                // const currentSlot = moment({ hour: startHour, minute: startMinute }).format("hh:mm A");
                const currentSlot: string =
                    this.modifyHourString(startHour) +
                    ":" +
                    this.modifyMinuteString(startMinute) +
                    this.getMeridiem(startHour);
                timeSlots.push(currentSlot);

                if (startMinute + timeSlotGap === 60) {
                    startHour += 1;
                    startMinute = 0;
                } else {
                    startMinute += timeSlotGap;
                }
            }
        }
        this.setState({
            timeSlots,
        });
    };

    componentDidMount() {
        this.getTimeSlots();
    }

    childScrollOffset = 0;

    get horizontalScrollOffset() {
        return this.childScrollOffset;
    }

    _keyExtractor = (i: string, x: number) => i;

    render() {
        const { timeSlots } = this.state;
        const { timeSlotWidth, timeTextStyle, timeBlockStyle, height } = this.props;
        return (
            <ScrollView
                horizontal
                style={styles(this.props).timelineRowStyle}
                ref={(sv) => {
                    this.stickyScroll = sv;
                }}
            >
                {timeSlots.map((ts) => (
                    <TimeBlock
                        time={ts}
                        key={ts}
                        width={timeSlotWidth}
                        height={height}
                        timeBlockStyle={timeBlockStyle}
                        timeTextStyle={timeTextStyle}
                    />
                ))}
            </ScrollView>
        );
    }
}

TimeLine.defaultProps = {
    timelineRowStyle: {
        backgroundColor: 'transparent',
    }
};

const styles = (props: TimeLineProps) =>
    StyleSheet.create({
        timelineRowStyle: {
            ...props.timelineRowStyle,
            height: props.height,
        },
    });

export default TimeLine;
