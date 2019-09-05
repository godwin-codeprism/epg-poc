import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

export interface ErrorBoundaryProps {}

export interface ErrorBoundaryState {
    error: any;
    errorInfo: any;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <View>
                    <Text>Error Occurred</Text>
                </View>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
