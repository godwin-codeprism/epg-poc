import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';

interface NoShowBlockProps {
    timeBlockWidth: number;
    height: number | string;
    width: number;
    noShowBlockStyle: ViewStyle;
    noShowTextStyle: ViewStyle,
    gapBwTwoShows: number | string,
    pos: 'START' | 'MIDDLE' | 'END'
};


class NoShowBlock extends React.PureComponent<NoShowBlockProps> {
    static defaultProps: Object;

    render() {
        const { width, timeBlockWidth, gapBwTwoShows, pos } = this.props;
        return (
            <View style={styles(this.props).container}>
                {
                    new Array(Math.floor( width / timeBlockWidth )).fill('p').map((nSB, index) => (
                        <View key={index.toString()} style={{ ...styles(this.props).noShowBlock, width: timeBlockWidth, marginLeft: pos === 'START' && index === 0 ? 0 : gapBwTwoShows }}>
                            <TouchableOpacity key={index.toString()}>
                                <Text numberOfLines={1} style={styles(this.props).showNameTextStyle}>
                                    No Info Available
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
                {
                    width % timeBlockWidth > 0 &&
                    <TouchableOpacity style={{ ...styles(this.props).noShowBlock, width: width % timeBlockWidth, marginLeft: pos === 'START' && Math.floor( width / timeBlockWidth ) === 0 ? 0 : gapBwTwoShows }} >
                        <Text numberOfLines={1} style={styles(this.props).showNameTextStyle}>
                            No Info Available
                        </Text>
                    </TouchableOpacity>
                }

            </View>
        )
    }
} 

NoShowBlock.defaultProps = {
    noShowBlockStyle: {
        backgroundColor: '#282828',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noShowTextStyle: {
        fontSize: 15,
        color: 'darkgray',
        padding: 10
    },
};

const styles = (props: NoShowBlockProps) => StyleSheet.create({
    container: {
        height: props.height,
        width: props.width,
        flexDirection: 'row'
    },
    noShowBlock: {
        ...props.noShowBlockStyle,
        height: props.height
    },
    showNameTextStyle: props.noShowTextStyle
});

export default NoShowBlock; 