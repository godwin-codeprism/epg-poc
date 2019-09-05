import React from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SmartFlatList } from 'react-native-mediafirst';
import EPGCell from "../../EPGCell";
/**
 * The below const are not part of code. 
 * They are used to create dummy data which the mocks the stracture of original data.
 */
const Channels = new Array(50).fill("C").map((ch, i) => { return { name: `Channel ${i + 1}`, stationId: `ST${i + 1}` } });
const Shows = new Array(500).fill("S").map((sh, i) => { return { name: `Ch${parseInt(i / 10) + 1} Show ${Math.floor(((i + 1) / 1) % 10) === 0 ? 10 : Math.floor(((i + 1) / 1) % 10)}`, stationId: `ST${parseInt(i / 10) + 1}` } });

const timeline = new Array(24).fill('i').map((i, x) => x).reduce((a, i) => [...a, i + ":00", i + ":30"], []);

/************ */

export default class EPG extends React.Component {
  StickeyTimeline = null;
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
      <View style={{ backgroundColor: 'orange', flex: 1, position: 'relative' }}>
        <SmartFlatList
          data={new Array(1).fill('Parent FlatList')}
          keyExtractor={this._keyExtractor}
          // ListHeaderComponent={
          //   <StickeyTimeline ref={st => { this.StickeyTimeline = st }} />
          // }
          // stickyHeaderIndices={[0]}
          renderItem={
            () => (
              <React.Fragment>
                <SmartFlatList
                  data={new Array(1).fill('Child Flatlist')}
                  keyExtractor={this._keyExtractor}
                  horizontal
                  onScroll={({ nativeEvent }) => {
                    if (this.state.expandedChannel) {
                      this.expandChannel(null);
                    }
                    this.childScrollOffset = nativeEvent.contentOffset.x;
                    // this.StickeyTimeline.updatetimeLine(Math.round(this.childScrollOffset));
                  }}
                  renderItem={
                    () => (
                      <React.Fragment>
                        <View style={{ flex: 1, paddingLeft: 135 }}>
                          {
                            Channels.map(ch => (
                              <ChannelRow name={ch.name} key={ch.name} shows={Shows.filter(sh => sh.stationId === ch.stationId)} expand={ch.name === this.state.expandedChannel} onPress={() => { this.expandChannel(ch.name) }} horizontalOffset={() => this.horizontalScrollOffset} />
                            ))
                          }
                        </View>
                      </React.Fragment>
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

class StickeyTimeline extends React.Component {
  scrollView = null;
  updatetimeLine = (xPos) => {
    // this.scrollView.scrollTo({ x: xPos, y: 0, animated: false })
    this.scrollView.scrollToOffset({ offset: 500, animated: false })
  }
  render() {
    return (
      <View style={{ marginLeft: 135, position: 'relative', width: '100%', backgroundColor: 'orange', width: '100%', height: 25 }}>
        {/* <ScrollView
          ref={(sv) => { this.scrollView = sv }}
          horizontal
        >
          {
            timeline.map(t => (
              <View style={{ backgroundColor: 'teal', width: 500, height: 25, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }} key={t}>
                <Text style={{ color: 'white', fontSize: 14 }}>{t}</Text>
              </View>
            ))
          }
        </ScrollView> */}
        <SmartFlatList
          ref={(sv) => { this.scrollView = sv }}
          horizontal
          keyExtractor={(item) => item}
          data={timeline}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: 'teal', width: 500, height: 25, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }} key={item}>
              <Text style={{ color: 'white', fontSize: 14 }}>{item}</Text>
            </View>
          )}
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
            this.props.shows.map((ch, ix) => (
              // <Cell name={ch.name} key={ch.name} onPress={this.props.onPress} />
              <EPGCell key={ch.name} style={{ width: 500, height: 125, marginHorizontal: 5 }} showName={ch.name} customId={ix}/>
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