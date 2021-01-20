import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Colors,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

export const customDefaultColor = {
  ...NavigationDefaultTheme.colors,
  ...PaperDefaultTheme.colors,
  primary: '#36b765',
  secondary: '#ffc61d',
  accent: '#56d785',
  background: Colors.white,
  error: '#f13a59',
  transparent1: 'rgba(0,0,0,0.06)',
  grey: '#444444',
  white: Colors.white,
  success: Colors.green500,
  blue: Colors.blue600,
};

export const customDarkColor = {
  ...NavigationDarkTheme.colors,
  ...PaperDarkTheme.colors,
};
