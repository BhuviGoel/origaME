import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ScrollView
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';
import firebase from 'firebase';

export default class Saved extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      saves: [],
      docId: '',
    };
  }

  getSaved = () => {
    db.collection('saved')
      .where('user_id', '==', this.state.userId)
      .onSnapshot((querySnapshot) => {
        var allSaved = [];
        var docId;
        querySnapshot.docs.map((doc) => {
          var saved = doc.data();
          docId = doc.id;
          allSaved.push(saved);
        });
        this.setState({
          saves: allSaved,
          docId: docId,
        });
      });
  };

  componentDidMount() {
    this.getSaved();
  }
  removeSave = () => {
    db.collection('saved')
      .doc(this.state.docId)
      .delete()
      .then(() => {
        alert('Deleted Succesfully!');
        Alert.alert('Deleted Succesfully!');
      })
      .catch((error) => {
        Alert('Error removing document: ', error);
      });
    this.getSaved();
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: '#FFE6EE' }}>
          <LinearGradient
            colors={['#f36732', '#ec254e']}
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.heading}>
            <Text style={styles.headingTest}>Bookmarked</Text>
          </LinearGradient>
          <ScrollView style={{marginBottom: 55}}>

          {this.state.saves.length == 0 ? (
            <View>
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Text style={{ fontSize: 17 }}>
                  No bookmarks yet! Click the Star Icon in your tutorial to save
                  them here for later!
                </Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../assets/saved.png')}
                  style={{
                    width: 300,
                    height: 150,
                  }}
                />
              </View>
            </View>
          ) : (
            <FlatList
              data={this.state.saves}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('TutorialDetails', {
                      listItemDetails: item,
                    });
                  }}
                  style={styles.cardContainer}>
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.img}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      paddingLeft: 10,
                      width: '100%',
                    }}>
                    <Text
                      style={[styles.input, { fontWeight: 'bold' }]}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.input, { fontSize: 14 }]}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      {item.level}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.removeSave();
                      }}></TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          </ScrollView>
        </View>
      </SafeAreaProvider>
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
  cardContainer: {
    margin: 5,
    borderRadius: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: '#f7936e',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    width: '60%',
    fontSize: 16,
    padding: 5,
  },
  img: {
    width: '20%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
