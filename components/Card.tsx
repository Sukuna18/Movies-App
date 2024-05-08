import React from 'react';
import {PureComponent} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Movie} from '../interfaces/movies';
import {NavigationProp} from '@react-navigation/native';

interface CardProps {
  item: Movie;
  navigation: NavigationProp<any>;
}
const placeholder = require('../assets/images/Placeholder.png');
class Card extends PureComponent<CardProps> {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate('Details', {
            itemId: item.id,
          })
        }>
        <Image
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : {uri: placeholder}
          }
          style={styles.image}
          resizeMode="cover"
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    justifyContent: 'center',
    height: 200,
  },
  image: {
    width: 120,
    height: 200,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
});

export default Card;
