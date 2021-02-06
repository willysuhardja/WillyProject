import React, {useEffect} from 'react';
import screenNames from '../../features/Auth/navigation/screenNames';
import {refreshControl} from '../../utils/flatlist';
import BasisListAndSearchScreen from '../BasicListAndSearch';

const environmentApi = [
  {
    name: 'API YOMART BY YOGYA',
    description: 'https://ymstock-api.yogyagroup.com/api/v1',
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
      list={environmentApi}
      refreshControl={refreshControl(false, () => {})}
      onItemPressed={onItemPressed}
      searchFields={['name']}
      searchPlaceholder={'Search Environment Api'}
    />
  );
};

export default Screen;
