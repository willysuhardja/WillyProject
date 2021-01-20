import {debounce} from 'lodash';
import React, {useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, IconButton, TouchableRipple} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  AppContainer,
  AppBasicHeader,
  AppButton,
  AppSnackbar,
  AppLoadingDialog,
} from '../../components';
import {DefaultTheme} from '../../theme';
import UpdateProfileForm from './components/UpdateProfileForm';
import ModalUploadOptions, {
  resultOptions,
} from './components/ModalUploadOptions';

const uploadOptions = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeigh: 300,
};

const Screen = ({
  navigation,
  route,
  profileLoading,
  profile,
  fetchUserProfile,
  doUpdateProfile,
  updateLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarInfoVisible, setSnackbarInfoVisible] = useState(false);
  const [image, setImage] = useState(null);

  const imageUrl = image ? image.uri : profile.image_url;

  const _onSubmit = (data) => {
    const uploadData = {
      ...data,
      image: image
        ? {
            ...image,
            name: image.fileName,
            uri:
              Platform.OS === 'android'
                ? image.uri
                : image.uri.replace('file://', ''),
          }
        : null,
    };

    doUpdateProfile(uploadData)
      .then(() => {
        setSnackbarInfoVisible(true);
        setImage(null);
        fetchUserProfile();
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const openModalUploadOptions = () => {
    setModalVisible(true);
  };

  const _onOptionPressed = (result) => {
    setModalVisible(false);
    if (result === resultOptions.camera) {
      launchCamera(uploadOptions, uploadHandler);
    } else {
      launchImageLibrary(uploadOptions, uploadHandler);
    }
  };

  const uploadHandler = (response) => {
    if (response.didCancel) {
    } else if (response.error) {
      Alert.alert('Error', 'Something went wrong');
    } else {
      const imageResponse = response;

      setImage(imageResponse);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{minHeight: '100%'}}>
      <AppBasicHeader app />
      <AppContainer
        start
        containerStyle={{
          backgroundColor: DefaultTheme.colors.surface,
        }}>
        <UpdateProfileForm
          onSubmit={_onSubmit}
          loading={updateLoading}
          defaultValues={profile}
        />
      </AppContainer>
      <ModalUploadOptions
        visible={modalVisible}
        setVisible={setModalVisible}
        onOptionPressed={_onOptionPressed}
      />
      <AppSnackbar
        visible={snackbarInfoVisible}
        setVisible={setSnackbarInfoVisible}
        action={{
          label: 'Close',
          onPress: () => {
            setSnackbarInfoVisible(false);
          },
        }}>
        Update Profile Success
      </AppSnackbar>
      <AppLoadingDialog visible={profileLoading} />
    </ScrollView>
  );
};

export default Screen;
