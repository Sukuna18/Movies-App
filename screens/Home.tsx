import React, {Fragment, useEffect, useState} from 'react';
import {
  getFamilyMovies,
  getPopularMovies,
  getPopularTvMovies,
} from '../services/service';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Movie, Movies} from '../interfaces/movies';
import List from '../components/List';
import Error from '../components/Error';

interface renderItemProps {
  item: string;
  index: number;
}
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  image: {
    width: width,
    height: height / 1.5,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
interface HomeProps {
  navigation: any;
}
const Home = ({navigation}: HomeProps) => {
  const [moviesImages, setMoviesImages] = useState<string[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movies | null>(null);
  const [popularTvMovies, setPopularTvMovies] = useState<Movies | null>(null);
  const [familyMovies, setFamilyMovies] = useState<Movies | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMoviesData = await getPopularMovies();
        const moviesArray: string[] = popularMoviesData.results.map(
          (movie: Movie) =>
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
        );
        setMoviesImages(moviesArray);
        setPopularMovies(popularMoviesData);

        const popularTvMoviesData = await getPopularTvMovies();
        setPopularTvMovies(popularTvMoviesData);

        const familyMoviesData = await getFamilyMovies();
        setFamilyMovies(familyMoviesData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const _renderItem = ({item}: renderItemProps) => {
    return (
      <View>
        <Image source={{uri: item}} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <Fragment>
      {isLoading && !error && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {error && (
        <Error
          text1="Oops Something went wrong!"
          text2="Please try again later"
        />
      )}
      {!isLoading && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.container}>
              <Carousel
                loop={true}
                autoplay={true}
                data={moviesImages}
                renderItem={_renderItem}
                sliderWidth={width}
                itemWidth={width}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                content={popularMovies?.results || []}
                title="Popular Movies"
              />
            </View>
          )}
          {popularTvMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                content={popularTvMovies?.results || []}
                title="Popular TV Shows"
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                content={familyMovies?.results || []}
                title="Family Movies"
              />
            </View>
          )}
        </ScrollView>
      )}
    </Fragment>
  );
};

export default Home;
