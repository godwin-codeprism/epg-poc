import * as React from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface WhichDayProps {
    width: string | number;
    height: string | number;
    whichDayContainer: ViewStyle;
    pickerStyle: ViewStyle;
    dayOptions: Array<{ label: string, value: string}>
};

interface WhichDayState {
    whichDay: string
};

class WhichDay extends React.Component<WhichDayProps, WhichDayState> {
    static defaultProps: Object;

    state = {
        whichDay: this.props.dayOptions !== undefined && this.props.dayOptions[0] !== undefined  ? this.props.dayOptions[0].value : '',
    };

    render() {
        const { whichDay } = this.state;
        const { dayOptions } = this.props;
        return (
            <View style={styles(this.props).container}>
                <Picker
                    selectedValue={whichDay}
                    style={styles(this.props).pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({whichDay: itemValue})
                    }
                    mode="dropdown"
                    >
                    {
                        dayOptions !== undefined && dayOptions !== null &&
                        dayOptions.map((dO: { label: string, value: string}) => (
                            <Picker.Item key={dO.value} label={dO.label} value={dO.value} />
                        ))
                    }
                </Picker>
            </View>
        );
    }
}

WhichDay.defaultProps = {
    whichDayContainer: {
        width: 110,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    pickerStyle: {
        color: 'white'
    }
};

const styles = (props: WhichDayProps) => StyleSheet.create({
    container: {
        ...props.whichDayContainer,
        height: props.height
    },
    pickerStyle: {
        ...props.pickerStyle,
        width: props.width,
        height: props.height,
    }
 })


export default WhichDay;

