import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Colors,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import {customDefaultColor, customDarkColor} from './colors';

export const DefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: customDefaultColor,
  spacing: 5,
};

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...customDefaultColor,
    background: Colors.grey50,
  },
};

export const DarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: customDarkColor,
  spacing: 5,
};
