import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Feather,
} from '@expo/vector-icons';
import firebase from 'firebase';
import { Icon, Avatar, Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      cameraPermissions: '',
      modalVisible: false,
      image: 'https://dummyimage.com/600x400/000/fff',
      userId: firebase.auth().currentUser.email,
      level: '',
    };
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
      .child('Showcase/' + this.state.userId + '/' + uniqueId);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection('showcase').add({
          user_id: this.state.userId,
          title: this.state.title,
          description: this.state.description,
          level: this.state.level,
          image: url,
          creationId: uniqueId,
        });
        Alert.alert('Successful');
        this.setState({
          image: 'https://dummyimage.com/600x400/000/fff',
          title: '',
          description: '',
          level: '',
        });
      })
      .catch((error) => {
        Alert.alert('Something went wrong in media upload, try again');
        this.setState({
          image: 'https://dummyimage.com/600x400/000/fff',
        });
      });
  };

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  async addDetails() {
    if (this.state.title && this.state.description && this.state.image) {
      var uniqueId = this.createUniqueId();
      var response = await fetch(this.state.image);
      var blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child('Showcase/' + this.state.userId + '/' + uniqueId);
      ref.put(blob).then((response) => {
        this.fetchImage(uniqueId);
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
      <View style={styles.container}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingTest}>Create</Text>
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
              backgroundColor: '#fff',
              width: '90%',
            }}>
            <Text style={styles.input}>Upload your image: </Text>
            <Avatar
              size="xlarge"
              source={{
                uri: this.state.image,
              }}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              containerStyle={{ alignSelf: 'center', margin: 20 }}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#000000"
                onChangeText={(text) => {
                  this.setState({ title: text });
                }}
                value={this.state.title}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Description"
                multiline={true}
                placeholderTextColor="#000000"
                onChangeText={(text) => {
                  this.setState({ description: text });
                }}
                value={this.state.description}
              />
            </View>
            <Picker
              mode="dropdown"
              selectedValue={this.state.level}
              style={{
                width: '95%',
                height: 60,
                marginTop: 10,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: 'black',
                color: 'black',
                backgroundColor: 'white',
                padding: 20,
                flex: 1,
                fontSize: 16,
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  level: itemValue,
                })
              }>
              <Picker.Item label="Level" value="" />
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Advanced" value="Advanced" />
              <Picker.Item label="Professional" value="Professional" />
            </Picker>

            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  this.addDetails();
                }}>
                <Text style={{ color: 'white', fontSize: 20 }}>Showcase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6EE',
  },
  fieldsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE6EE',
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
