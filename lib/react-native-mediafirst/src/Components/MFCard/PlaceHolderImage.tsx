import React from "react";
import { Animated, ImageBackground, ImageResizeMode, ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
interface State {
    opacity: number;
}
export interface PlaceHolderImageProps {
    style: StyleProp<ViewStyle>;
    /* Place holder image source. */
    source: ImageSourcePropType;
    /* opacity or visibility param whether to display the placeholder or hide. */
    opacity: number;
    resizeMode: ImageResizeMode;
}
/* PlaceHolderImage is used to display a local image source while loading the network uri image.*/
export default class PlaceHolderImage extends React.PureComponent<PlaceHolderImageProps, State> {
    constructor(props: PlaceHolderImageProps) {
        super(props);
        this.state = {
            opacity: this.props.opacity,
        };
    }
    changeVisibility(opacity: number) {
        this.setState({ opacity: opacity });
    }

    componentWillReceiveProps(nextProps: PlaceHolderImageProps) {
        if (nextProps.opacity && nextProps.opacity !== this.state.opacity)
            this.setState({ opacity: nextProps.opacity });
    }

    render() {
        return (
            <Animated.View
                style={[
                    {
                        flex: 1,
                        justifyContent: "flex-start",
                        alignContent: "flex-start",
                    },
                    this.state.opacity !== 1 && { display: "none" },
                ]}
            >
                <ImageBackground
                    resizeMode={this.props.resizeMode}
                    style={[this.props.style]}
                    source={this.props.source}
                />
            </Animated.View>
        );
    }
}
