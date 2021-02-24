import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {AppButton, AppContainer, AppImage} from '../../components';

export default function Screen({theme}) {
  const styles = makeStyles(theme);
  const [image, setImage] = useState(null);

  const cameraLaunch = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setImage(res);
      }
    });
  };

  const galleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setImage(res);
      }
    });
  };

  return (
    <AppContainer>
      <View style={styles.imageWrapper}>
        {image === null ? (
          <Title>No Image</Title>
        ) : (
          <AppImage imageStyle={styles.image} image={image.uri} />
        )}
      </View>
      <AppButton onPress={cameraLaunch} mode="contained">
        Take From Camera
      </AppButton>
      <AppButton onPress={galleryLaunch} mode="contained">
        Take From Gallery
      </AppButton>
    </AppContainer>
  );
}

const makeStyles = (theme) => {
  return StyleSheet.create({
    imageWrapper: {flex: 1, justifyContent: 'center'},
    image: {width: theme.screenWidth, height: 300},
  });
};
