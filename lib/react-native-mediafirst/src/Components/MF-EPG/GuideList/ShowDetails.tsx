import React from "react";
import { Animated, View, Text, StyleSheet, ImageSourcePropType, ViewStyle } from 'react-native';
import ProgressBar from './progressBar';
import DetailsButton from './detailsButton';

interface ShowDetailsProps {
  showDetailsContainer: ViewStyle,
  showDetailsNameRow: ViewStyle,
  showLabelStyle: ViewStyle,
  showLabelTextStyle: ViewStyle,
  showNameStyle: ViewStyle,
  showDetailsStyle: ViewStyle,
  showDescStyle: ViewStyle,
  progressBarViewStyle: ViewStyle,
  showDetailsViewStyle: ViewStyle,
  showActionsViewStyle: ViewStyle,

  /** Details */
  showName: string | null,
  timeLength: string,
  startEnd: string,
  description: string,
  isNew: boolean,
  isAdult: boolean,
  progress: number;

  /** Actions */
  actionButtonHeight: number | string;
  actionButtonStyle: ViewStyle;
  actionLabelStyle: ViewStyle;
  actionIconStyle: ImageSourcePropType;
  onRecord: () => void,
  onInfoClick: () => void,
  recordButtonIcon: ImageSourcePropType,
  infoButtonIcon: ImageSourcePropType

  /**ProgressBar */
  progressBarStyle: ViewStyle;
  progressStyle: ViewStyle;
};

interface ShowDetailsState {
  fadeAnim: Object;
}

class ShowDetails extends React.PureComponent<ShowDetailsProps, ShowDetailsState> {
    static defaultProps: Object;

    state = {
      fadeAnim: new Animated.Value(0),  
    }
  
    componentDidMount() {
      Animated.timing(            
        this.state.fadeAnim,      
        {
          toValue: 1,             
          duration: 2000,        
        }
      ).start();                  
    }

    render() {
      const {
        showName,
        timeLength,
        startEnd,
        description,
        isNew,
        isAdult,
        recordButtonIcon,
        infoButtonIcon,
        onRecord,
        onInfoClick,
        progress,
        progressBarStyle,
        progressStyle,
        actionButtonHeight,
        actionButtonStyle,
        actionLabelStyle,
        actionIconStyle
      } = this.props;

      let { fadeAnim } = this.state;

      return (
          <View style={styles(this.props).container}>
            <Animated.View style={{ opacity: fadeAnim }}>
            <View>
              <View style={styles(this.props).showDetailsViewStyle}>
                <View style={styles(this.props).showDetailsNameRow}>
                  <Text style={styles(this.props).showNameStyle}>
                    {
                      showName
                    }
                  </Text>
                  {
                    isNew &&
                    <View style={styles(this.props).showLabelStyle}>
                      <Text style={styles(this.props).showLabelTextStyle}>
                        New
                      </Text>
                    </View>
                  }
                  {
                    isAdult &&
                    <View style={styles(this.props).showLabelStyle}>
                      <Text style={styles(this.props).showLabelTextStyle}>
                        Adult
                      </Text>
                    </View>
                  }
                </View>
                <View>
                  <Text style={styles(this.props).showDetailsStyle}>
                    {
                      timeLength
                    }
                  </Text>
                  <Text style={styles(this.props).showDetailsStyle}>
                    {
                      startEnd
                    }
                  </Text>
                </View>
                <Text style={styles(this.props).showDescStyle} numberOfLines={2}>
                  {
                    description
                  }
                </Text>
                <View style={styles(this.props).progressBarViewStyle}>
                  <ProgressBar progress={progress} progressBarStyle={progressBarStyle} progressStyle={progressStyle} />
                </View>
              </View>  
              <View style={styles(this.props).showActionsViewStyle}>
                <View style={{ marginRight: 20}}>
                  <DetailsButton
                    icon={infoButtonIcon}
                    label="Info"
                    onPress={onInfoClick}
                    actionButtonHeight={actionButtonHeight}
                    actionButtonStyle={actionButtonStyle}
                    actionLabelStyle={actionLabelStyle}
                    actionIconStyle={actionIconStyle}
                  />
                </View>
                <DetailsButton
                  icon={recordButtonIcon}
                  label="Record" onPress={onRecord}
                  actionButtonHeight={actionButtonHeight}
                  actionButtonStyle={actionButtonStyle}
                  actionLabelStyle={actionLabelStyle}
                  actionIconStyle={actionIconStyle}
                />
              </View>
            </View>
            </Animated.View>
          </View>
      )
    }
}

ShowDetails.defaultProps = {
  showDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    padding: 5,
    paddingLeft: 20
  },
  showDetailsViewStyle: {
    height: 145
  },
  showDetailsNameRow: {
    flexDirection: 'row'
  },
  showLabelStyle: {
    height: 20,
    width: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  showLabelTextStyle: {
    color: 'black',
    fontSize: 15,
  },
  showNameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10
  },
  showDetailsStyle: {
    fontSize: 12,
    color: 'white'
  },
  showDescStyle: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 12,
    color: 'white',
    maxWidth: 500
  },
  progressBarViewStyle: {
    paddingTop: 20,
    paddingBottom: 10,
    maxWidth: 250
  },
  showActionsViewStyle: {
    height: 50,
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    maxWidth: 300
  }
}

const styles = (props: ShowDetailsProps) => StyleSheet.create({
  container: props.showDetailsContainer,
  showDetailsNameRow: props.showDetailsNameRow,
  showLabelStyle: props.showLabelStyle,
  showLabelTextStyle: props.showLabelTextStyle,
  showNameStyle: props.showNameStyle,
  showDetailsStyle: props.showDetailsStyle,
  showDescStyle: props.showDescStyle,
  progressBarViewStyle: props.progressBarViewStyle,
  showDetailsViewStyle: props.showDetailsViewStyle,
  showActionsViewStyle: props.showActionsViewStyle
});

export default ShowDetails;