import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  AntDesign,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';
import * as firebase from 'firebase';

export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      creations: [],
      weeklyPost: {},
      userId: firebase.auth().currentUser.email,
      userCreations: [],
    };
  }

  getCreations = () => {
    db.collection('showcase').onSnapshot((snapshot) => {
      var allCreations = [];
      snapshot.docs.map((doc) => {
        var creation = doc.data();
        allCreations.push(creation);
      });
      this.setState({ creations: allCreations });
    });
  };

  getUserCreations = () => {
    db.collection('showcase').where("user_id", "==", this.state.userId).onSnapshot((snapshot) => {
      var allCreations = [];
      snapshot.docs.map((doc) => {
        var creation = doc.data();
        allCreations.push(creation);
      });
      this.setState({ userCreations: allCreations });
    });
  };

  getWeekly = () => {
    db.collection('weeklyPost').onSnapshot((snapshot) => {
      var weeklyPost = [];
      snapshot.docs.map((doc) => {
        var creation = doc.data();
        weeklyPost.push(creation);
      });
      this.setState({ weeklyPost: weeklyPost[0] });
    });
  };

  componentDidMount() {
    this.getCreations();
    this.getWeekly();
    this.getUserCreations();
  }
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor:'#ffe6ee' }}>
        <LinearGradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingText}>Media</Text>
        </LinearGradient>
        <View style={{ flex: 1}}>
          <Text style={{marginTop: 10, alignSelf: 'center', textDecorationLine: 'underline'}}>Creation of the Week</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('WeeklyDetails', {
                listItemDetails: this.state.weeklyPost,
              });
            }}
            style={{
              flex: 0.4,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Image
              style={{
                aspectRatio: 1,
                height: '85%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderColor: 'black',
                borderWidth: 1,
              }}
              source={{ uri: this.state.weeklyPost.image }}
            />
            <View
              style={{
                backgroundColor: '#191919',
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                height: '13%',
                width: '56%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff', fontSize: 20 }}>
                {this.state.weeklyPost.title}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 0.3 }}>
            <Text style={{marginLeft: 5, textDecorationLine: 'underline'}}>Your Creations</Text>
            {this.state.userCreations.length == 0 ? (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 14 }}>No creations yet! Click on "Upload" to upload your creations.</Text>
              <Image source={require("../assets/upload.png")}/>
            </View>
          ) : (            
          <FlatList
            data={this.state.userCreations}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('CreationDetails', {
                    listItemDetails: item,
                  });
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 3,
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    aspectRatio: 1,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    flex: 1,
                    padding: 10,
                    justifyContent: 'flex-end',
                    width: 100,
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#191919',
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    height: '20%',
                    width: '100%',
                  }}>
                  <Text style={{ color: '#fff' }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />)}

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UserCreations')}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 12,
                  marginBottom: 6,
                  color: '#f36732',
                  textDecorationLine: 'underline',
                  marginRight: 10,
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.3 }}>
          <Text style={{marginLeft: 5,textDecorationLine: 'underline'}}>All Creations</Text>
            <FlatList
              data={this.state.creations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('CreationDetails', {
                      listItemDetails: item,
                    });
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    margin: 3,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      aspectRatio: 1,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      flex: 1,
                      padding: 10,
                      justifyContent: 'flex-end',
                    }}
                  />
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#191919',
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      height: '20%',
                      width: '100%',
                    }}>
                    <Text style={{ color: '#fff' }}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Creations')}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 12,
                  marginBottom: 6,
                  color: '#f36732',
                  textDecorationLine: 'underline',
                  marginRight: 10,
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.1 }}></View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Create');
          }}
          style={styles.fab}>
          <AntDesign name="plus" size={22} color="#ec254e" />
          <Text style={{color: '#ec254e'}}> Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 90,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    top: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 8,
    flexDirection: 'row'
  },
});
