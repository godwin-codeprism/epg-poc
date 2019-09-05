import React, {Component} from 'react';  
import {TouchableOpacity, StyleSheet, ImageSourcePropType, Text, Image, View, ViewStyle } from 'react-native';

interface DetailsButtonProps {
  actionButtonHeight: number | string;
  actionButtonStyle: ViewStyle;
  actionLabelStyle: ViewStyle;
  actionIconStyle: ImageSourcePropType;
  label: string;
  icon: ImageSourcePropType;
  onPress: () => void;
};

class DetailsButton extends Component<DetailsButtonProps> {
  static defaultProps: Object;

  render() {  
    const { label, icon, onPress } = this.props;
    return (  
      <View style={styles(this.props).container}>
        <TouchableOpacity
          style={styles(this.props).buttonStyle}
          onPress={onPress}
        >
          <Image source={icon} style={styles(this.props).iconSize}/>
          <Text style={styles(this.props).labelStyle}>
            {
              label
            }
          </Text>
        </TouchableOpacity>
      </View>
    );  
  }  
}

DetailsButton.defaultProps = {
  actionButtonHeight: 30,
  actionButtonStyle : {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabelStyle: {
    color: 'white',
    fontSize: 12
  },
  actionIconStyle: {
    width: 12,
    height: 12,
    marginRight: 10
  }
};



const styles = (props: DetailsButtonProps) => StyleSheet.create({
  container: {
    height: props.actionButtonHeight,
    width: 'auto'
  },
  buttonStyle: { 
    ...props.actionButtonStyle,
    height: props.actionButtonHeight,  
  },
  labelStyle: props.actionLabelStyle,
  iconSize: props.actionIconStyle
});  

export default DetailsButton;