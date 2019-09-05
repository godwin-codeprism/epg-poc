import React, {Component} from 'react';  
import { StyleSheet, View, ViewStyle } from 'react-native';  
import PropsRow from '../../../../../../src/Components/MediaFirstEPGGuideDemo/PropsRow';

interface ProgressbarProps {
  progress: number;
  progressBarStyle: ViewStyle;
  progressStyle: ViewStyle;
}

class ProgressBar extends Component<ProgressbarProps> {   
  static defaultProps: Object;

  render() { 
    const { progress } = this.props;
    return (  
      <View style={styles(this.props).container}>  
        <View  
            style={styles(this.props).inner}  
        />  
      </View>  
    );  
  }  
} 

ProgressBar.defaultProps = {
  progressBarStyle: {  
    width: "100%",  
    height: 10,  
    padding: 1,    
    borderRadius: 5,  
    justifyContent: "center",  
    backgroundColor: 'peru'
  },
  progressStyle: {  
    width: "100%",  
    height: 8,  
    borderRadius: 5,  
    backgroundColor: "gold",  
  }
};

const styles = (props: ProgressbarProps) => StyleSheet.create({  
  container: props.progressBarStyle,  
  inner: { 
    ...props.progressStyle,
    width: props.progress +'%'
  }
});  

export default ProgressBar;