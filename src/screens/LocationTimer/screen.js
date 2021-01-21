import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {Alert, BackHandler, ScrollView, View} from 'react-native';
import {Card, IconButton, Title} from 'react-native-paper';
import {
  AppBasicHeader,
  AppButton,
  AppContainer,
  AppLoadingBasic,
  AppParagraph,
} from '../../components';
import {default as homeScreenNames} from '../../features/Home/navigation/screenNames';
import {DefaultTheme} from '../../theme';

import StopwatchTimer from './components/StopwatchTimer';

export default function Screen({
  navigation,
  route,
  verificationLoading,
  verificationError,
  submitLoading,
  submitError,
  location,
  startTime,
  setStartTime,
  setEndTime,
  doVerifyLocation,
  doReset,
  doSubmitCount,
}) {
  const {barcode} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(homeScreenNames.index);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  useLayoutEffect(() => {
    if (barcode === null) {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            color="white"
            onPress={() => navigation.navigate(homeScreenNames.index)}
          />
        ),
      });
    }
  }, [barcode, navigation]);

  useEffect(() => {
    const bootstrap = () => {
      verifyLocation();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    setStartTime(new Date().getTime());
  };

  const stopTimer = () => {
    clearInterval();
  };

  const verifyLocation = () => {
    if (barcode) {
      doVerifyLocation(barcode)
        .then(() => {
          navigation.setParams({
            barcode: null,
          });
          startTimer();
        })
        .catch((error) => {
          Alert.alert('Error', error.message, [
            {text: 'Ok', onPress: navigation.goBack},
          ]);
        });
    } else {
      if (!location.id) {
        Alert.alert('Error', 'Please Re-Scan', [
          {text: 'Ok', onPress: navigation.goBack},
        ]);
      }
    }
  };

  const _onCancelPressed = () => {
    doReset();
    navigation.goBack();
  };

  const _onFinishPressed = () => {
    stopTimer();
    const endTime = new Date().getTime();
    setEndTime(endTime);
    doSubmitCount()
      .then((message) => {
        Alert.alert('Success', message, [
          {text: 'Ok', onPress: navigation.goBack},
        ]);
      })
      .catch((error) => {
        Alert.alert('Error', error.message, [
          {text: 'Ok', onPress: navigation.goBack},
        ]);
      });
  };

  if (verificationLoading || submitLoading) {
    return <AppLoadingBasic />;
  }

  if (verificationError) {
    return <View />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <AppBasicHeader />

      <Card style={styles.cardLocation}>
        <Card.Content>
          <Title>Location</Title>
          <AppParagraph>{location.name}</AppParagraph>
        </Card.Content>
      </Card>

      <AppContainer containerStyle={styles.container}>
        <View style={styles.stopwatchContainer}>
          <StopwatchTimer start={startTime} />
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton
            onPress={_onCancelPressed}
            mode="contained"
            color={DefaultTheme.colors.error}>
            Cancel
          </AppButton>
          <AppButton onPress={_onFinishPressed} mode="contained">
            Finish
          </AppButton>
        </View>
      </AppContainer>
    </ScrollView>
  );
}

const styles = {
  scrollView: {minHeight: '100%'},
  container: {
    marginTop: 30,
  },
  stopwatchContainer: {flex: 1},
  buttonsContainer: {flex: 1, width: '100%', justifyContent: 'flex-end'},
  cardLocation: {
    width: '70%',
    marginTop: -90,
    alignSelf: 'center',
    elevation: 4,
  },
};
