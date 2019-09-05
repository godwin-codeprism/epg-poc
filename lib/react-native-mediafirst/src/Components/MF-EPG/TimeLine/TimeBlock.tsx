import React from "react";
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

interface TimeBlockProps {
    timeBlockStyle: ViewStyle;
    timeTextStyle: TextStyle;
    time: string,
    height: string | number,
    width: string | number,
    key: string
};

class TimeBlock extends React.Component<TimeBlockProps> {
    static defaultProps: Object;

    render() {
      return (
        <View style={styles(this.props).container}>
            <Text style={styles(this.props).timeTextStyle}>
                {
                    this.props.time
                }
            </Text>
        </View>
      )
    }
  } 

TimeBlock.defaultProps = {
    timeBlockStyle: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'grey', 
        paddingLeft: 10
    },
    timeTextStyle: {
        fontSize: 12,
        color: 'white'
    }
};

const styles = (props: TimeBlockProps) => StyleSheet.create({
    container : {
        ...props.timeBlockStyle,
        height: props.height,
        width: props.width
    },
    timeTextStyle: props.timeTextStyle
});

export default TimeBlock; 