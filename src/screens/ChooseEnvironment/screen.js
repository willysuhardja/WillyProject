import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  AppBasicHeader,
  AppButton,
  AppContainer,
  AppTextInput,
} from '../../components';
import config from '../../config';
import screenNames from '../../features/Auth/navigation/screenNames';
import {DefaultTheme} from '../../theme';

const Screen = (props) => {
  const {navigation, setEnvirontment} = props;

  const [mainApi, setMainApi] = useState(() => config.baseURL);
  const [goldApi, setGoldApi] = useState(() => config.goldURL);
  const [isEnvValid, setIsEnvValid] = useState(false);

  const onApplyEnv = () => {
    setEnvirontment({mainApi, goldApi});
    navigation.navigate(screenNames.login);
  };

  useEffect(() => {
    if (!!mainApi && !!goldApi) {
      if (!isEnvValid) {
        setIsEnvValid(true);
      }
    } else {
      if (isEnvValid) {
        setIsEnvValid(false);
      }
    }
  }, [goldApi, isEnvValid, mainApi]);

  return (
    <>
      <AppBasicHeader title="Choose Environtment" />
      <AppContainer start containerStyle={styles.container}>
        <View style={{flex: 1, width: '100%'}}>
          <AppTextInput
            value={mainApi}
            label="Main API"
            onChangeText={setMainApi}
            right={
              mainApi !== config.baseURL && (
                <TextInput.Icon
                  name="refresh"
                  onPress={() => setMainApi(config.baseURL)}
                />
              )
            }
          />
          <AppTextInput
            value={goldApi}
            label="Gold API"
            onChangeText={setGoldApi}
            right={
              goldApi !== config.goldURL && (
                <TextInput.Icon
                  name="refresh"
                  onPress={() => setGoldApi(config.goldURL)}
                />
              )
            }
          />
        </View>
        <AppButton disabled={!isEnvValid} mode="contained" onPress={onApplyEnv}>
          Apply Environment
        </AppButton>
      </AppContainer>
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.colors.surface,
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
});
