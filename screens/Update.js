import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';
import firebase from 'firebase';
import { Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      about: '',
      cameraPermissions: '',
      modalVisible: false,
      image: 'https://dummyimage.com/600x400/000/fff',
      userId: firebase.auth().currentUser.email,
    };
  }

  userDetails = () => {
    db.collection('users')
      .doc(this.state.userId)
      .get()
      .then((doc) => {
        var user = doc.data();
        this.setState({
          name: user.name,
          image: user.image,
          about: user.about,
        });
      });
  };

componentDidMount=()=>{
  this.userDetails()
}

  takePhotoFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPermissions: status === 'granted',
    });
    if (this.state.cameraPermissions) {
      await ImagePicker.launchCameraAsync({
        compressImageMaxWidth: 290,
        compressImageMaxHeight: 290,
        cropping: true,
        compressImageQuality: 0.9,
      }).then((image) => {
        this.setState({ image: image.uri });
        this.setState({
          modalVisible: false,
        });
      });
    } else {
      return alert('Permissions Not Granted').then(() => {
        this.setState({
          modalVisible: false,
        });
      });
    }
  };
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({
      modalVisible: false,
    });
    if (!cancelled) {
      this.setState({ image: uri });
      this.setState({
        modalVisible: false,
      });
    }
  };

  fetchImage = (uniqueId) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('avatar/' + uniqueId);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection('users').doc(this.state.userId).update({
          name: this.state.name,
          about: this.state.about,
          image: url,
        });
        Alert.alert('Successful');
      })
      .catch((error) => {
        Alert.alert('Something went wrong in media upload, try again');
        this.setState({
          image: 'https://dummyimage.com/600x400/000/fff',
        });
      });
  };

  async addDetails() {
    if (this.state.name && this.state.about && this.state.image) {
      var response = await fetch(this.state.image);
      var blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child('avatar/' + this.state.userId);
      ref.put(blob).then((response) => {
        this.fetchImage(this.state.userId);
      });
    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK'}],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/setting.png')}
        style={{ flex: 1 }}>
      <View style={styles.container}>
        <SafeAreaView />
        <LinearGradient
          // Button Linear Gradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingTest}>Update Profile</Text>
          <Icon
            name="arrow-left"
            type="feather"
            color="white"
            size={24}
            containerStyle={{ position: 'absolute', left: 10, top: 23 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </LinearGradient>
        <View>
          <Modal
            style={styles.modalView}
            isVisible={this.state.modalVisible}
            backdropOpacity={0.4}
            deviceWidth={Dimensions.get('window').width}
            deviceHeight={Dimensions.get('window').height}
            onBackdropPress={() => this.setState({ modalVisible: false })}>
            <View style={styles.modalMainView}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: -13,
                  right: -10,
                  margin: 10,
                  padding: 10,
                }}
                onPress={() => this.setState({ modalVisible: false })}>
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="#ec254e"
                  onPress={() => this.setState({ modalVisible: false })}
                />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                Choose An Option
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.takePhotoFromCamera();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Feather
                    name="camera"
                    size={24}
                    color="#ec254e"
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                  <Text style={{ textAlign: 'center' }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.selectPicture();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <FontAwesome
                    name="photo"
                    size={24}
                    color="#ec254e"
                    onPress={() => this.setState({ modalVisible: false })}
                  />
                  <Text style={{ textAlign: 'center' }}>Photos</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.fieldsContainer}>
          <View
            style={{
              alignSelf: 'center',
              margin: 10,
              padding: 20,
              alignItems: 'center',
              marginTop: 5,
              borderRadius: 10,
              backgroundColor: '#ffffffd8',
              width: '90%',
            }}>
            <Text style={styles.input}>Upload your new profile picture: </Text>
            <Avatar
              size="xlarge"
              source={{
                uri: this.state.image,
              }}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              containerStyle={{ alignSelf: 'center', margin: 20, marginTop: 5 }}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#000000"
                onChangeText={(text) => {
                  this.setState({ name: text }); 
                }}
                value={this.state.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="About Me"
                multiline={true}
                placeholderTextColor="#000000"
                onChangeText={(text) => {
                  this.setState({ about: text });
                }}
                value={this.state.about}
              />
            </View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  this.addDetails();
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  submitButton: {
    width: '73%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ec254e',
    padding: 10,
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '60%',
    height: '60%',
  },
  modalMainView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: '#bbbb',
  },
  inputContainer: {
    width: '95%',
    height: 40,
    marginTop: 10,
    borderRadius: 4,
    borderColor: 'black',
    // flex: 1,
    alignSelf: 'center',
    borderWidth: 0.2,
  },
  input: {
    color: 'black',
    backgroundColor: 'white',
    padding: 7,
    fontSize: 16,
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
