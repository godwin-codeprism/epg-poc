/**
 * @format
 */
import React from 'react';
import { AppRegistry, requireNativeComponent, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import App from './src/EPG/epg';
// import App from "./EPGCell";
import { name as appName } from './app.json';

const GScrollView = requireNativeComponent("GScrollView");
const EPGCell = requireNativeComponent("EPGCell");
const GHorizontalLayout = requireNativeComponent("GHorizontalLayout");

class App extends React.Component {
  state = {
    attach: false
  }
  _onPress() {
    console.log("Godwin Before", this.state.attach);
    this.setState({ attach: true }, () => {
      console.log("Godwin", this.state.attach);
    });
  }
  render() {
    return (
      <React.Fragment>
        <GScrollView style={{ height: '100%', width: Dimensions.get('window').width }} >
          <GHorizontalLayout>
            {
              new Array(75).fill("i").map((i, x) => (
                <EPGCell style={{ width: 135, height: 50, margin: 5 }} showName={'show ' + x} key={x} />
              ))
            }
          </GHorizontalLayout>
        </GScrollView>
      </React.Fragment>
    )
  }
}

AppRegistry.registerComponent(appName, () => App);
