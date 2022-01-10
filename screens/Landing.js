import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

export default class Landing extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground
          source={require('../assets/signupbg.png')}
          style={styles.image}>
          <View style={styles.container}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.appIcon}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: -90,
              marginBottom: 110,
            }}>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
              origaME
            </Text>
          </View>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signupButton: {
    width: '73%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: '#000000b8',
    marginTop: 15,
  },
  loginButton: {
    width: '73%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginTop: 15,
    borderColor: '#000000b8',
    borderWidth: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    marginBottom: 90,
  },
});
