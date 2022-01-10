import * as React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View
} from 'react-native';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class About extends React.Component {
  constructor() {
    super();
    this.state = {
      like: 0,
      dislike: 0,
    };
  }

  likecount = () => {
    this.setState({ like: this.state.like + 1 });
  };
  dislikecount = () => {
    this.setState({ dislike: this.state.dislike + 1 });
  };
  render() {
    return (
      <ImageBackground
        source={require('../assets/setting.png')}
        style={{ flex: 1 }}>
        <LinearGradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingTest}>About App</Text>
          <Icon
            name="arrow-left"
            type="feather"
            color="white"
            size={24}
            containerStyle={{ position: 'absolute', left: 10, top: 23 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </LinearGradient>
        <ScrollView style={{ height: '100%', marginBottom: 55 }}>
        <View
          style={{
            alignSelf: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            backgroundColor: '#ffffffd8',
            width: '90%',
            marginBottom: 10,
          }}>          
          <Text style={styles.buttonText}>
            The 'origaME' app is simple and easy to use. Follow the step-by-step instructions and don’t worry, you’d 
            have to try really hard to get confused.
          </Text>

          <Text style={styles.buttonText}>
           "Hey, that point shouldn’t be sticking out like that!" Something went wrong? That’s because even an airplane
            requires concentration and patience. Let this tranquil pastime completely absorb you, and your complete 
            relaxation is guaranteed. 
          </Text>

          <Text style={styles.buttonText}>
            By the way, origami develops logical reasoning, attention span, spatial thinking and fine motor skills. 
            Consider that when you’re trying to keep fidgety kids busy.
          </Text>
          </View>
        <LinearGradient
          // Button Linear Gradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingTest}>Acknowledgement</Text>
        </LinearGradient>
        <View
          style={{
            alignSelf: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            backgroundColor: '#ffffffd8',
            width: '90%',
            marginBottom: 10,
          }}>  
          <Text style={styles.buttonText}>
              This app was made using the website{' '}
              <Text
                style={{ color: 'blue' }}
                onPress={() => Linking.openURL('https://origami.me/')}>
                  Origami.me
              </Text>.
          </Text>
          </View>
     </ScrollView>          
    </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    marginBottom: 8,
    paddingLeft: 5,
    paddingRight: 5,
  },
  heading: {
    height: 70,
    backgroundColor: '#2460a7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTest: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
