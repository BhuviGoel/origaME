import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Header, Icon, Avatar } from 'react-native-elements';
import db from '../config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MaterialIcons,
} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class CreationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.route.params.listItemDetails['image'],
      title: this.props.route.params.listItemDetails['title'],
      description: this.props.route.params.listItemDetails['description'],
      level: this.props.route.params.listItemDetails['level'],
      user_id: this.props.route.params.listItemDetails['user_id'],
      isImageModalVisible: false,
      isUserModalVisible: false,
      name: '',
      profile: '',
      about: '',
      userData: [],
    };
  }

  getUserDetails = () => {
    db.collection('users')
      .doc(this.state.user_id)
      .get()
      .then((doc) => {
        var user = doc.data();
        this.setState({
          userData: user,
        });
      });
  };

  updateUserDetails = () => {
    this.getUserDetails();
    this.setState({
      name: this.state.userData['name'],
      profile: this.state.userData['image'],
      about: this.state.userData['about'],
    });
  };
  componentDidMount = () => {
    this.updateUserDetails();
  };

  updateLike() {
    Alert.alert('Feature coming soon!');
  }

  showImageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.isImageModalVisible}
        backDropOpacity={0.4}>
        <View>
          <Card
            containerStyle={{
              maxWidth: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Avatar source={{ uri: this.state.image }} size={'xlarge'} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -13,
                right: -10,
                margin: 10,
                padding: 10,
              }}
              onPress={() => this.setState({ isImageModalVisible: false })}>
              <MaterialIcons
                name="cancel"
                size={24}
                color="#ec254e"
                onPress={() => this.setState({ isImageModalVisible: false })}
              />
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };
  showUserModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.isUserModalVisible}
        backDropOpacity={0.4}>
        <View>
          <Card
            containerStyle={{
              maxWidth: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Avatar source={{ uri: this.state.profile }} size={'xlarge'} />
            <Text
              style={{
                textAlign: 'center',
                margin: 5,
                fontSize: 16,
              }}>
              {this.state.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                textDecorationLine: 'underline',
                color: '#f36732',
              }}>
              {this.state.user_id}
            </Text>
            <Text
              style={{
                textAlign: 'left',
                margin: 5,
                fontSize: 16,
              }}>
              About: {this.state.about}
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -20,
                right: -20,
                margin: 5,
                padding: 5,
              }}
              onPress={() => this.setState({ isUserModalVisible: false })}>
              <MaterialIcons
                name="cancel"
                size={24}
                color="#ec254e"
                onPress={() => this.setState({ isUserModalVisible: false })}
              />
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffe6ee' }}>
        <SafeAreaProvider>
          <LinearGradient
            colors={['#f36732', '#ec254e']}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.heading}>
            <Text style={styles.headingTest}>Creation Details</Text>
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
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.container}>
              {this.showImageModal()}
              <View>{this.showUserModal()}</View>
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
                <Avatar
                  source={{ uri: this.state.image }}
                  size={'large'}
                  onPress={() => {
                    this.setState({ isImageModalVisible: true });
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    padding: 10,
                  }}>
                  {this.state.title}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    padding: 10,
                  }}>
                  Level: {this.state.level}
                </Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    padding: 10,
                    backgroundColor: '#f36732',
                  }}
                  onPress={() => {
                    this.setState({ isUserModalVisible: true });
                    this.updateUserDetails();
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                    }}>
                    {this.state.user_id}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    padding: 10,
                    marginBottom: 10,
                  }}>
                  <Icon
                    name="info"
                    type="Feather"
                    color="#f36732"
                    style={{ marginTop: 5 }}
                  />
                  <Text
                    style={{
                      alignSelf: 'center',
                      padding: 7,
                      fontSize: 14,
                      flexWrap: 'wrap',
                    }}>
                    {this.state.description}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: '50%',
                    bottom: -10,
                    backgroundColor: '#ec254e',
                    borderRadius: 20,
                    padding: 10,
                  }}>
                  <Ionicons
                    name="heart"
                    color="#fff"
                    size={20}
                    onPress={() => {
                      this.updateLike();
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
