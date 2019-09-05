import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

type ButtonProps = {
    /**
     * Handler to be called when the user taps the button
     */
    onPress: () => any;
    onFocus: () => any;
    onBlur: () => any;

    styles: any;

    /**
     * TV preferred focus (see documentation for the View component).
     */
    hasTVPreferredFocus?: boolean;

    /**
     * TV next focus down (see documentation for the View component).
     *
     * @platform android
     */
    nextFocusDown?: number;

    /**
     * TV next focus forward (see documentation for the View component).
     *
     * @platform android
     */
    nextFocusForward?: number;

    /**
     * TV next focus left (see documentation for the View component).
     *
     * @platform android
     */
    nextFocusLeft?: number;

    /**
     * TV next focus right (see documentation for the View component).
     *
     * @platform android
     */
    nextFocusRight?: number;

    /**
     * TV next focus up (see documentation for the View component).
     *
     * @platform android
     */
    nextFocusUp?: number;

    /**
     * Text to display for blindness accessibility features
     */
    accessibilityLabel?: string;

    /**
     * If true, disable all interactions for this component.
     */
    disabled?: boolean;

    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string;
};

class TouchableButton extends React.Component<ButtonProps> {
    render() {
        const {
            accessibilityLabel,
            onPress,
            onFocus,
            onBlur,
            hasTVPreferredFocus,
            disabled,
            testID,
            styles,
        } = this.props;
        const buttonStyles: Array<{ [key: string]: string | Object | undefined }> = [_styles.button];
        const textStyles: Array<{ [key: string]: string | Object | undefined }> = [_styles.text];
        const accessibilityStates: Array<any> = [];
        if (disabled) {
            buttonStyles.push(_styles.buttonDisabled);
            textStyles.push(_styles.textDisabled);
            accessibilityStates.push("disabled");
        }
        const Touchable = Platform.OS === "android" ? TouchableOpacity : TouchableOpacity;
        return (
            <TouchableOpacity
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                hasTVPreferredFocus={hasTVPreferredFocus}
                testID={testID}
                disabled={disabled}
                onPress={onPress}
                onFocus={onFocus}
                onBlur={onBlur}
                tvParallaxProperties={{
                    enabled: false,
                }}
            >
                <View style={[buttonStyles, styles]}>{this.props.children}</View>
            </TouchableOpacity>
        );
    }
}

export default TouchableButton;

const _styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        elevation: 4,
        borderRadius: 2,
    },
    text: {
        textAlign: "center",
        padding: 8,
        ...Platform.select({
            ios: {
                // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
                color: "#007AFF",
                fontSize: 18,
            },
            android: {
                color: "white",
                fontWeight: "500",
            },
        }),
    },
    buttonDisabled: Platform.select({
        ios: {},
        android: {
            elevation: 0,
            backgroundColor: "#dfdfdf",
        },
    }),
    textDisabled: Platform.select({
        ios: {
            color: "#cdcdcd",
        },
        android: {
            color: "#a1a1a1",
        },
    }),
});
