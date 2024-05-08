import React from 'react';
import {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface ErrorProps {
  text1: string;
  text2: string;
}
class Error extends PureComponent<ErrorProps> {
  state = {};
  render() {
    const {text1, text2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
  },
});

export default Error;
