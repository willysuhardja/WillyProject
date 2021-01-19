import React from 'react';
import {Snackbar} from 'react-native-paper';

export default function AppSnackbar({setVisible, children, ...props}) {
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar onDismiss={onDismissSnackBar} {...props}>
      {children}
    </Snackbar>
  );
}
