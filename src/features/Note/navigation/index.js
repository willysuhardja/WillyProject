import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';

import NoteListScreen from './../../../screens/NoteList';
import NoteFormScreen from './../../../screens/NoteForm';
import {DefaultTheme} from '../../../theme';

const {Navigator, Screen} = createStackNavigator();

const NoteStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: DefaultTheme.colors.white,
        headerStyle: {
          backgroundColor: DefaultTheme.colors.primary,
        },
      }}>
      <Screen
        options={() => {
          return {
            title: 'Note',
          };
        }}
        name={screenNames.list}
        component={NoteListScreen}
      />
      <Screen
        options={({
          route: {
            params: {mode},
          },
        }) => {
          return {
            title: mode === 'add' ? 'Add Note' : 'Edit Note',
          };
        }}
        name={screenNames.form}
        component={NoteFormScreen}
      />
    </Navigator>
  );
};

export default NoteStack;
