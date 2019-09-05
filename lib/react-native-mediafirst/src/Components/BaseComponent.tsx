import * as React from "react";

export interface AppProps {}

export interface AppState {}
export default class BaseComponent<P = {}, S = {}, SS = any> extends React.PureComponent<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }
}
