import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import {Movie} from '../interfaces/movies';
import {getMovieDetails} from '../services/service';
import {Rating} from 'react-native-ratings';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
interface DetailsProps {
  route?: RouteProp<{params: {itemId: number}}, 'params'>;
}
const height = Dimensions.get('screen').height;
const Details = ({route}: DetailsProps) => {
  const itemId = route?.params.itemId;
  const [details, setDetails] = React.useState<Movie | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const placeholder = require('../assets/images/Placeholder.png');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMovieDetails(itemId as number);
        setDetails(response);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [itemId]);
  return (
    <View>
      {isLoading && !error && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!isLoading && !error && (
        <View>
          <ScrollView>
            <Image
              source={
                details?.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' + details.poster_path,
                    }
                  : {uri: placeholder}
              }
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.playButton}>
              <PlayButton
                handlePress={() => {
                  setModalVisible(true);
                }}
              />
            </View>
            <Text style={styles.movieTitle}>{details?.title}</Text>
            {details?.genres && (
              <Text style={styles.genres}>
                Genres: {details.genres.map(genre => genre.name).join(', ')}
              </Text>
            )}

            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              startingValue={details?.vote_average}
              readonly={true}
              tintColor="#f2f2f2"
            />
            <Text style={styles.overview}>{details?.overview}</Text>
            <Text style={styles.releaseDate}>
              Release Date: {dateFormat(details?.release_date, 'mmmm dS, yyyy')}
            </Text>
          </ScrollView>
          <Modal
            visible={modalVisible}
            transparent={false}
            animationType="slide">
            <View style={styles.videoModal}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.text}>Close</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
      {error && (
        <View style={styles.container}>
          <Text style={styles.text}>
            Something went wrong, please try again later
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  playButton: {
    position: 'relative',
    marginBottom: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  genres: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  releaseDate: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  image: {
    height: height / 2,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
