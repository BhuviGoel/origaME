import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import {
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      name: '',
      docId: '',
      userId: firebase.auth().currentUser.email,
      profile: '#',
      userData: [],
      about: '',
    };
  }
  logout = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
      });
  };

  userDetails = () => {
    db.collection('users')
      .doc(this.state.userId)
      .get()
      .then((doc) => {
        var user = doc.data();
        this.setState({
          name: user.name,
          profile: user.image,
          about: user.about,
        });
      });
  };

  componentDidMount = () => {
    this.userDetails();
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/setting.png')}
        style={{ flex: 1 }}>
      <View style={{ flex: 1}}>
        <View style={{ flex: 1 }}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#f36732', '#ec254e']}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 0.2,
              padding: 5,
              justifyContent: 'center',
            }}>
            <View
              style={{
                paddingLeft: 10,
                flex: 1,
                flexDirection: 'row',
                marginTop: 10
              }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  margin: 10,
                  borderRadius: 35,
                  marginTop: 30,
                }}
                source={{
                  uri: this.state.profile,
                }}
              />
              <View
                style={{
                  marginTop: 20,
                  alignItems: 'flex-start',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {this.state.name}
                </Text>

                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    marginTop: 5,
                  }}>
                  {this.state.userId}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    marginTop: 5,
                  }}>
                  {this.state.about}
                </Text>
              </View>
            </View>
          </LinearGradient>

          <View style={{ flex: 0.7, padding: 10 }}>
            <View style={styles.ss}>
              <FontAwesome name={'user-circle-o'} size={24} color="#f36732" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Update');
                  this.userDetails();
                }}
                style={styles.sss}>
                <Text style={{ color: '#261c1f', fontSize: 16 }}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ss}>
              <AntDesign name={'mobile1'} size={24} color="#f36732" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('About');
                  this.userDetails();
                }}
                style={styles.sss}>
                <Text style={{ color: '#261c1f', fontSize: 16 }}>
                  About App
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ss}>
              <AntDesign name={'customerservice'} size={24} color="#f36732" />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Contact');
                  this.userDetails();
                }}
                style={styles.sss}>
                <Text style={{ color: '#261c1f', fontSize: 16 }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ss}>
              <AntDesign name={'logout'} size={24} color="#f36732" />
              <TouchableOpacity
                onPress={() => {
                  this.logout();
                  this.userDetails();
                }}
                style={styles.sss}>
                <Text style={{ color: '#261c1f', fontSize: 16 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.1, padding: 10 }}></View>
        </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  ss: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 20,
    paddingRight: 15,
    backgroundColor: '#ffffffd8'
  },
  sss: {
    height: 50,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#ffffff05',
    justifyContent: 'center',
    borderBottomColor: '#ec254e',
    padding: 10,
    backgroundColor: '#ffffff05'
  },
});
