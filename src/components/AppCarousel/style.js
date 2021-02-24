import {StyleSheet} from 'react-native';

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {width: theme.screenWidth, height: 100},
    image: {
      height: 100,
      backgroundColor: theme.colors.background,
      marginHorizontal: 10,
      borderRadius: 10,
      width: theme.screenWidth - 20,
    },
    dotsWrapper: {
      flexDirection: 'row',
    },
    pagination: {
      position: 'absolute',
      bottom: 10,
      left: 10,
    },
    dot: {
      width: 8,
      height: 8,
      backgroundColor: '#333',
      borderRadius: 4,
      marginHorizontal: 2,
    },
    dotIndicator: {
      position: 'absolute',
      height: 8,
      width: 8,
      backgroundColor: '#fff',
      borderRadius: 4,
      left: 2,
      bottom: 0,
    },
  });

export default makeStyles;
