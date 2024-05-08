import React from 'react';
import {PureComponent} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
const playButton = require('../assets/images/play.png');
interface PlayButtonProps {
  handlePress: () => void;
}
class PlayButton extends PureComponent<PlayButtonProps> {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable style={styles.container} onPress={handlePress}>
        <Image source={playButton} style={styles.playButton} />
      </Pressable>
    );
  }
}

export default PlayButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -24,
    right: 20,
    width: 50,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
  },
  playButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
