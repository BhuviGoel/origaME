import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Card, Header, Icon, ThemeConsumer } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TabNavigator } from '../navigation/TopNavigator';
import firebase from 'firebase';
import db from '../config';

export default class TutorialDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      image: this.props.route.params.listItemDetails['image'],
      title: this.props.route.params.listItemDetails['title'],
      subtitle: this.props.route.params.listItemDetails['subtitle'],
      addInfo: this.props.route.params.listItemDetails['addInfo'],
      list: this.props.route.params.listItemDetails['steps'],
      level: this.props.route.params.listItemDetails['level'],
      tutorialId: this.props.route.params.listItemDetails['tutorialId'],
      material: this.props.route.params.listItemDetails['material'],
      buttonPressed: false,
      iconname: 'star-outline',
      color: 'white',
      docId: '',
    };
  }

  componentDidMount() {
    try {
      db.collection('saved')
        .where('user_id', '==', this.state.userId)
        .where('tutorialId', '==', this.state.tutorialId)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length == 0) {
            this.setState({
              buttonPressed: false,
              iconname: 'star-outline',
              color: 'white',
            });
          } else {
            snapshot.docs.map((doc) => {
              this.setState({
                buttonPressed: true,
                iconname: 'star',
                color: '#f3ba00',
                docId: doc.id,
              });
            });
          }
        });
    } catch (e) {
    }
  }

  savedPressed = () => {
    try {
      if (this.state.buttonPressed) {
        this.setState({
          buttonPressed: false,
          iconname: 'star-outline',
          color: '#fff',
        });
        db.collection('saved').doc(this.state.docId).delete();
      } else {
        this.setState({
          buttonPressed: true,
          iconname: 'star',
          color: '#f3ba00',
        });

        db.collection('saved').add({
          user_id: this.state.userId,
          image: this.state.image,
          title: this.state.title,
          subtitle: this.state.subtitle,
          addInfo: this.state.addInfo,
          steps: this.state.list,
          level: this.state.level,
          material: this.state.material,
          tutorialId: this.state.tutorialId,
        });
        db.collection('saved')
          .where('user_id', '==', this.state.userId)
          .where('tutorialId', '==', this.state.tutorialId)
          .get()
          .then((snapshot) => {
            snapshot.docs.map((doc) => {
              this.setState({
                docId: doc.id,
              });
            });
          });
        alert('Saved Successfully!');
        Alert.alert('Saved Successfully!');
      }
    } catch (e) {
    }
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ width: '100%', height: 250 }}>
          <Image
            style={{ width: '100%', height: '85%' }}
            resizeMode="contain"
            source={{ uri: this.state.image }}
          />
          <Icon
            name="arrow-left"
            type="feather"
            color="white"
            size={24}
            containerStyle={{ position: 'absolute', left: 10, top: 10 }}
            onPress={() => this.props.navigation.goBack()}
          />
          <Ionicons
            name={this.state.iconname}
            size={24}
            color={this.state.color}
            style={{ position: 'absolute', right: 10, top: 10 }}
            onPress={() => this.savedPressed()}
          />
          <View
            style={{
              height: '15%',
              padding: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#f36732',
            }}>
            <Text>Name: {this.state.title}</Text>
            <Text>Time: {this.state.addInfo}</Text>
          </View>
        </View>

        <TabNavigator detail={this.props.route.params} />
      </SafeAreaProvider>
    );
  }
}
