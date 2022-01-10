import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {
  Entypo,
  AntDesign,
} from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

export default class SignUp extends React.Component {
  // declared constructor for initialising states
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      contact: '',
      address: '',
      confirmPassword: '',
      image: 'https://dummyimage.com/600x400/000/fff',
      about: '',
    };
  }

  // function called onPress of SignUp button for registering user with firebase
  signUp = (email, password, confirmPassword) => {
    //checking if the password and confirm password are matching
    if (password != confirmPassword) {
      alert("Passwords don't match");
      Alert.alert("Passwords don't match");
    } else {
      //calling firebase signUp function
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('users').doc(this.state.email).set({
            name: this.state.firstName,
            email: this.state.email,
            image: this.state.image,
            about: this.state.about,
          });
          alert('User added successfully');
          Alert.alert('User added successfully');
          this.props.navigation.navigate('Login');
        })
        .catch((error) => { 
          var errorcode = error.code;
          var errorM = error.message;
        });
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={require('../assets/signupbg.png')}
          style={styles.image}>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 50,
              justifyContent: 'center'
            }}>
            <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold', marginTop: '25%' }}>
              Create an Account
            </Text>
            <Text style={{ color: 'white', fontSize: 16, marginTop: 3 }}>
              Glad to have you here!
            </Text>
          </View>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={[styles.inputContainer, { marginTop: 20 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'user'} size={25} color="#ec254e" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Name'}
                  placeholderTextColor="#4d4d4d"
                  onChangeText={(text) => {
                    this.setState({
                      firstName: text,
                    });
                  }}
                  value={this.state.firstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Entypo name={'mail'} size={25} color="#ec254e" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Email Id'}
                  placeholderTextColor="#4d4d4d"
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    this.setState({
                      email: text,
                    });
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
                  placeholder={'Password'}
                  placeholderTextColor="#4d4d4d"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                  value={this.state.password}
                />
              </View>
              <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                <View style={styles.iconStyle}>
                  <AntDesign name={'eyeo'} size={25} color="#ec254e" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={'Confirm Password'}
                  placeholderTextColor="#4d4d4d"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}
                  value={this.state.confirmPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => {
                  this.signUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  Already a user? Sign in
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signUpButton: {
    width: '73%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: '#000000b8',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
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
