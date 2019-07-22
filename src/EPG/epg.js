import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

/**
 * The below const are not part of code. 
 * They are used to create dummy data which the mocks the stracture of original data.
 */
const Channels = new Array(50).fill("C").map((ch, i) => { return { name: `Channel ${i + 1}`, stationId: `ST${i + 1}` } });
const Shows = new Array(500).fill("S").map((sh, i) => { return { name: `Ch${parseInt(i / 10) + 1} Show ${Math.floor(((i + 1) / 1) % 10) === 0 ? 10 : Math.floor(((i + 1) / 1) % 10)}`, stationId: `ST${parseInt(i / 10) + 1}` } });

/************ */

export default class EPG extends React.Component {
  state = {
    expandedChannel: null
  }
  childScrollOffset = 0;

  get horizontalScrollOffset() {
    return this.childScrollOffset;
  }
  expandChannel = (name) => {
    this.setState({ expandedChannel: this.state.expandedChannel === name ? null : name });
  }
  _keyExtractor = (i, x) => i;
  render() {
    return (
      <View style={{ backgroundColor: 'orange', flex: 1 }}>
        <FlatList
          data={new Array(1).fill('Parent FlatList')}
          keyExtractor={this._keyExtractor}
          renderItem={
            () => (
              <React.Fragment>
                <FlatList
                  data={new Array(1).fill('Child Flatlist')}
                  keyExtractor={this._keyExtractor}
                  horizontal
                  onScroll={({ nativeEvent }) => {
                    if (this.state.expandedChannel) {
                      this.expandChannel(null);
                    }
                    this.childScrollOffset = nativeEvent.contentOffset.x;
                  }}
                  renderItem={
                    () => (
                      <View style={{ flex: 1, paddingLeft: 135 }}>
                        {
                          Channels.map(ch => (
                            <ChannelRow name={ch.name} key={ch.name} shows={Shows.filter(sh => sh.stationId === ch.stationId)} expand={ch.name === this.state.expandedChannel} onPress={() => { this.expandChannel(ch.name) }} horizontalOffset={() => this.horizontalScrollOffset} />
                          ))
                        }
                      </View>
                    )
                  }
                />
                <View style={{ position: 'absolute', width: 135, top: 0, left: 0 }}>
                  {
                    Channels.map(ch => (
                      <ChannelCell name={ch.name} key={ch.name} expand={ch.name === this.state.expandedChannel} />
                    ))
                  }
                </View>
              </React.Fragment>
            )
          }
        />
      </View>
    )
  }
}


class ChannelRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.expand !== this.props.expand;
  }
  render() {
    return (
      <React.Fragment>
        <View style={{ height: 125, marginVertical: 5, flexDirection: 'row' }}>
          {
            this.props.shows.map(ch => (
              <Cell name={ch.name} key={ch.name} onPress={this.props.onPress} />
            ))
          }
        </View>
        {
          this.props.expand && (
            <View style={{ backgroundColor: '#454545', height: 300, width: '100%', marginLeft: -135, paddingLeft: this.props.horizontalOffset() }}>
              <ExpandedContentContainer />
            </View>
          )
        }
      </React.Fragment>
    )
  }
}


/**
 * The below componente will be repalced by our native component for better performance. 
 */
class Cell extends React.Component {
  render() {
    return (
      <TouchableOpacity style={{ backgroundColor: 'indigo', width: 500, height: 125, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }} onPress={this.props.onPress}>
        <Text style={{ color: 'white', fontSize: 14 }}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}

class ChannelCell extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.expand !== this.props.expand;
  }
  render() {
    return (
      <React.Fragment>
        <View style={{ width: 125, height: 125, marginVertical: 5, backgroundColor: '#0086FF', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 14 }}>{this.props.name}</Text>
        </View>
        {
          this.props.expand && (
            <View style={{ height: 300, width: 125 }}>
            </View>
          )
        }
      </React.Fragment>
    )
  }
}

class ExpandedContentContainer extends React.Component {
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Text style={{ color: 'white', fontSize: 14 }}>Do whatever the hell you want here.</Text>
      </View>
    )
  }
}