import React, { PureComponent } from "react";
import { StyleProp, Text, TextStyle, ViewStyle, StyleSheet } from "react-native";
import TouchableButton from "./TouchableButton";
export interface Props {
    index?: number;
    item?: string;
    isSelected?: boolean;
    extraObject?: Object;
    allowDeselecting?: Array<string>;
    activeButtonStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    activeButtonTextStyle?: StyleProp<TextStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
    onFocus?: (index: number, item: string, extraObject: Object) => void;
    onBlur?: (index: number, item: string, extraObject: Object) => void;
    onPress: (index?: number, item?: string, extraObject?: Object) => void;
}

export interface State {
    isFocused?: boolean;
    isSelected?: boolean;
}

export default class FocusableText extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isFocused: false,
        };
    }
    render() {
        const { isFocused } = this.state;
        const { isSelected, allowDeselecting, onPress, item } = this.props;
        return (
            <TouchableButton
                styles={
                    isSelected && isFocused
                        ? _styles.selectedFocusStyle
                        : isSelected
                        ? _styles.selectedStyle
                        : isFocused
                        ? [_styles.activeStyle, this.props.activeButtonStyle]
                        : [_styles.buttonStyle, this.props.buttonStyle]
                }
                onBlur={() => {
                    this.setState({ isFocused: false });
                }}
                onFocus={() => {
                    this.setState({ isFocused: true });
                }}
                onPress={() => {
                    if (allowDeselecting && isSelected) {
                        onPress(this.props.index);
                    } else {
                        onPress(this.props.index, item);
                    }
                }}
            >
                <Text
                    style={[
                        isFocused || isSelected
                            ? [_styles.buttonTextActive, this.props.activeButtonTextStyle]
                            : [_styles.buttonText, this.props.buttonTextStyle],
                    ]}
                >
                    {" "}
                    {item}{" "}
                </Text>
            </TouchableButton>
        );
    }
}

const _styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#EDEDED",
    },
    activeStyle: {
        backgroundColor: "#1194f6",
    },
    buttonText: {
        color: "#212121",
    },
    buttonTextActive: {
        color: "#FFFFFF",
    },
    selectedStyle: {
        backgroundColor: "#800080",
    },
    selectedFocusStyle: {
        backgroundColor: "#4B0082",
    },
});
