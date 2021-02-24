import {StyleSheet} from 'react-native';

const makeStyles = (theme) =>
  StyleSheet.create({
    button: {
      width: 90,
      minHeight: 56,
      marginVertical: 10,
      justifyContent: 'center',
    },
    icon: {
      alignSelf: 'center',
      justifyContent: 'center',
      paddingVertical: 0,
      marginVertical: 0,
    },
    label: {
      fontSize: 12,
      lineHeight: 12,
      textAlign: 'center',
    },
  });

export default makeStyles;
