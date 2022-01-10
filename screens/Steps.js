import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView
} from 'react-native';

import { SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';

export default class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.route.params.listItemDetails.steps,
      userId: firebase.auth().currentUser.email,
    };
    this.requestref = null;
  }

  render() {
    return (
      <SafeAreaProvider>
        <ScrollView style={{marginBottom: 55, backgroundColor: 'white'}}>
        <View style={{ flex: 1, backgroundColor: 'white', height: '100%' }}>
          <View>
            <View
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#fff',
                paddingTop: 20,
              }}>
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
                  renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        style={styles.img}
                      />
                      <View
                        style={{
                          paddingLeft: 10,
                          width: '100%',
                        }}>
                        <Text style={styles.input}>{item.title}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
          </View>
        </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
    borderRadius: 10,
    padding: 5,
    borderWidth: 2,
    borderColor: '#f36732',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  img: {
    alignSelf: 'center',
    width: '50%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
