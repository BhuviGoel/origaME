import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import {
  Entypo,
  AntDesign,
} from '@expo/vector-icons';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // function called onPress of login button for login with firebase
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        //navigating to home screen(the student list screen)
        this.props.navigation.navigate('DashboardScreen');
      })
      .catch((error) => {
        var errorcode = error.code;
        var errorM = error.message;
      });
  };

  forgetPassword = (email) => {
    if (email !== '') {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          alert(
            'Reset password link has been sent to your email. Please follow the link to reset your password.'
          );
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      alert('Please enter your registered email id');
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/signupbg.png')}
          style={styles.image}>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 50,
            }}>
            <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}>
              Login to your Account
            </Text>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 3 }}>
              Excited to have you back!
            </Text>
          </View>
          <KeyboardAvoidingView style={{ marginTop: 20, alignItems: 'center' }}>
            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <Entypo name={'mail'} size={25} color="#ec254e" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000"
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
                value={this.state.email}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <AntDesign name={'eye'} size={25} color="#ec254e" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#000"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
                value={this.state.password}
              />
            </View>
            <TouchableOpacity
              style={{
                width: '55%',
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                alignSelf: 'flex-end',
              }}
              onPress={() => {
                this.forgetPassword(this.state.email);
              }}>
              <Text style={{ fontSize: 16, color: '#000000' }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.login(this.state.email, this.state.password);
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '55%',
                height: 30, 
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                marginTop: 5,
              }}
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Not a user? Sign up
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    width: '73%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: '#000000b8',
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
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '85%',
    height: 47,
    borderColor: 'black',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 18,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
