import React, {useEffect} from 'react';
import screenNames from '../../features/Auth/navigation/screenNames';
import {refreshControl} from '../../utils/flatlist';
import BasisListAndSearchScreen from '../BasicListAndSearch';

const environmentGoldApi = [
  {
    name: 'GOLD API YOGYA',
    description: 'https://gold-api.yogyagroup.com',
  },
];

const Screen = ({navigation}) => {
  const onItemPressed = ({id, name}) => {
    navigation.navigate(screenNames.chooseEnv);
  };

  useEffect(() => {
    const bootstrap = () => {
      getEnvirontmentApi();
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEnvirontmentApi = () => {};

  return (
    <BasisListAndSearchScreen
      navigation={navigation}
      list={environmentGoldApi}
      refreshControl={refreshControl(false, () => {})}
      onItemPressed={onItemPressed}
      searchFields={['name']}
      searchPlaceholder={'Search Environment Gold'}
    />
  );
};

export default Screen;
