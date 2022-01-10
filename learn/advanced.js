import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import db from '../config';

export default class Advanced extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
    this.requestref = null;
  }

  componentDidMount() {
    this.getTutorials();
  }
  getTutorials() {
    db.collection('advanced').onSnapshot((snapshot) => {
      var allCreations = [];
      snapshot.docs.map((doc) => {
        var creation = doc.data();
        creation['tutorialId'] = doc.id;
        allCreations.push(creation);
      });
      this.setState({ list: allCreations });
    });
  }
  renderItem = ({ item }) => {
    return (
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
            {item.subtitle}
          </Text>
          <Text
            style={[styles.input, { fontSize: 14 }]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {item.addInfo}
          </Text>
        </View>
      </TouchableOpacity>
    );
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
            <Text style={styles.headingTest}>Advanced Tutorials</Text>
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

          {this.state.list.length == 0 ? (
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16 }}>No records found</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.list}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => {
                index.toString();
              }}
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
    width: '30%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
