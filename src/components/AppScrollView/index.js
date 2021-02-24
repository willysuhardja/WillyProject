import React from 'react';
import {ScrollView} from 'react-native';

export default function AppScrollView(props) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollView}
      {...props}
    />
  );
}

const styles = {
  scrollView: {minHeight: '100%'},
};
