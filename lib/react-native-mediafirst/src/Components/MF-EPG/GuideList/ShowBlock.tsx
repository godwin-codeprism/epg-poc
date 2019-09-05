import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';

interface ShowBlockProps {
    showName: string,
    height: string | number,
    width: string | number,
    key: string,
    showBlockStyle: ViewStyle,
    showTextStyle: ViewStyle,
    onPress: () => void,
    gapBwTwoShows: number | string,
    leftGapNeeded:  boolean
 };

class ShowBlock extends React.PureComponent<ShowBlockProps> {
    static defaultProps: Object;

    render() {
        const { onPress, showName, gapBwTwoShows} = this.props;
        return (
            <View style={styles(this.props).container}>
                <TouchableOpacity style={styles(this.props).showBlockStyle} onPress={onPress} activeOpacity={0.5}>
                    <Text numberOfLines={1} style={styles(this.props).showTextStyle}>
                        {
                            showName
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
} 

ShowBlock.defaultProps = {
    showBlockStyle: {
        backgroundColor: '#282828',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showTextStyle: {
        fontSize: 15,
        color: 'white',
        padding: 10
    }
};

const styles = (props: ShowBlockProps) => StyleSheet.create({
    container: {
        width: props.width,
        height: props.height,
        marginLeft: props.leftGapNeeded ? props.gapBwTwoShows : 0
    },
    showBlockStyle : {
        ...props.showBlockStyle,
        height: props.height,
        width: props.width,
    },
    showTextStyle: props.showTextStyle
});

export default ShowBlock; 