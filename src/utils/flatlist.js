import React from 'react';
import {RefreshControl} from 'react-native';

export const keyExtractor = (key = 'list') => (item, index) =>
  `${key}-${index}`;

export const refreshControl = (loading, onRefresh) => (
  <RefreshControl refreshing={loading} onRefresh={onRefresh} />
);
