import {StyleSheet} from 'react-native';

const makeStyles = (theme) =>
  StyleSheet.create({
    image: {
      alignSelf: 'center',
      resizeMode: 'cover',
      height: 200,
    },
  });

export default makeStyles;
