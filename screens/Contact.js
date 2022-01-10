import * as React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class Contact extends React.Component {
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
      <ScrollView style={{ height: '100%' }}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingTest}>Contact Us</Text> 
          <Icon
            name="arrow-left"
            type="feather"
            color="white"
            size={24}
            containerStyle={{ position: 'absolute', left: 10, top: 23 }}
            onPress={() => this.props.navigation.goBack()}
          />
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
          Whether you have a query or complaint or even a suggestion, you can
          contact us any time!
        </Text>
        <Text style={styles.buttonText}>
          Email Id : code.bhuvigoel@gmail.com
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
