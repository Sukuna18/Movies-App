import React from 'react';
import {PureComponent} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Movie} from '../interfaces/movies';
import Card from './Card';

interface ListProps {
  title: string;
  content: Movie[];
  navigation: any;
}

class List extends PureComponent<ListProps> {
  render() {
    const {title, navigation, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});
export default List;
