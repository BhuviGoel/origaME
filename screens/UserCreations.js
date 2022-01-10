import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';
import * as firebase from 'firebase';

const numColumns = 2;
export default class UserCreations extends React.Component {
  constructor() {
    super();
    this.state = {
      creations: [],
      userId: firebase.auth().currentUser.email,
    };
  }

  getCreations = () => {
    db.collection('showcase').where("user_id", "==", this.state.userId).onSnapshot((snapshot) => {
      var allCreations = [];
      snapshot.docs.map((doc) => {
        var creation = doc.data();
        allCreations.push(creation);
      });
      this.setState({ creations: allCreations });
    });
  };

  componentDidMount() {
    this.getCreations();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#FFE6EE',
          height: '100%',
        }}>
        <LinearGradient
          colors={['#f36732', '#ec254e']}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heading}>
          <Text style={styles.headingTest}>Your Creations</Text>
          <Icon
            name="arrow-left"
            type="feather"
            color="white"
            size={24}
            containerStyle={{ position: 'absolute', left: 10, top: 23 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </LinearGradient>        
        <ScrollView style={{marginBottom: 55}}>
        {this.state.creations.length == 0 ? (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 17, margin: 15 }}>No creations yet! Click on "Upload" to upload your creations.</Text>
              <Image source={require("../assets/upload.png")}/>
            </View>
          ) : (
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
                  aspectRatio: 1,
                  margin: 4,
                  flex: 1 / numColumns,
                  borderWidth: 2,
                  borderColor: '#ec254e',
                }}>
                <ImageBackground
                  source={{ uri: item.image }}
                  style={{
                    aspectRatio: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ec254eb8',
                      height: 20,
                    }}>
                    <Text style={{ color: '#fff' }}>{item.title}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
          /> )}
        
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTest: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
