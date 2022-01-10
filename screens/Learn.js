import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class Learn extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <LinearGradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingTest}>Get Started!</Text>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Beginner');
            }}>
            <ImageBackground
              source={require('../assets/2.png')}
              style={styles.image}
            />
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#ec254eb8',
              }}>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                BEGINNER
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Advanced');
            }}>
            <ImageBackground
              source={require('../assets/3.png')}
              style={styles.image}
            />
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#ec254eb8',
              }}>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                ADVANCED
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Professional');
            }}>
            <ImageBackground
              source={require('../assets/4.png')}
              style={styles.image}
            />
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#ec254eb8',
              }}>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                PROFESSIONAL
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTest: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    height: '100%',
    width: '100%',
    opacity: 0.9,
    backgroundColor: 'red',
    position: 'absolute',
  },
  button: {
    flex: 0.25,
    width: '90%',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: 'red',
    overflow: 'hidden',
    margin: 7,
    borderColor: '#ec254e',
    borderWidth: 3,
    justifyContent: 'center',
  },
});