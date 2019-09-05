import React from "react";
import { Animated, Dimensions, Easing, StyleProp, ViewStyle } from "react-native";
import { CARD_SCALE_ANIMATION_DURATION_MED } from "../../Utils";
interface Props {
    style: StyleProp<ViewStyle>;
}
interface State {
    isFocused: boolean;
}
class LeftTransitionView extends React.Component<Props, State> {
    animatedValue: Animated.Value;
    translateXPosition: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            isFocused: false,
        };
        this.animatedValue = new Animated.Value(1);
        this.translateXPosition = Dimensions.get("screen").width * 0.15 * 0.65;
    }
    handleAnimation() {
        Animated.timing(this.animatedValue, {
            toValue: this.state.isFocused ? 1 : 0,
            duration: CARD_SCALE_ANIMATION_DURATION_MED,
            // easing: Easing.ease,
            easing: Easing.out(Easing.poly(4)),
            useNativeDriver: true,
        }).start();
    }
    onFocus = () => {
        this.setState({ isFocused: true });
        this.handleAnimation();
    };

    onBlur = () => {
        this.setState({ isFocused: false });
        this.handleAnimation();
    };

    render() {
        let transformStyle = {
            transform: [
                {
                    translateX: this.animatedValue.interpolate({
                        inputRange: [0.1, 0.99],
                        outputRange: [-this.translateXPosition, 0],
                    }),
                },
            ],
        };

        return <Animated.View style={[transformStyle, this.props.style]}>{this.props.children}</Animated.View>;
    }
}

export default LeftTransitionView;
