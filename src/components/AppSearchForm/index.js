import {debounce} from 'lodash';
import React, {useState, useCallback, memo} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {AppTextInput} from '..';
import {searchArrayObject} from '../../utils/searching';

const SearchFrom = ({
  style,
  onSubmit,
  list = [],
  setSearchResult,
  setSearchText,
  searchFields = ['name'],
  placeholder = 'Search Data',
}) => {
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchBranch = useCallback(
    debounce((text) => {
      const filteredBranches = searchArrayObject(text, list, searchFields);
      setSearchLoading(false);
      setSearchResult(filteredBranches);
    }, 100),
    [list],
  );

  const onSearch = (text) => {
    setSearchText(text);

    if (!searchLoading) {
      setSearchLoading(true);
    }

    handleSearchBranch(text);
  };

  const {control, handleSubmit, errors} = useForm();
  return (
    <View style={[styles.container, style]}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <View>
            <AppTextInput
              inputStyle={styles.input}
              mode="outlined"
              returnKeyLabel="Search"
              placeholder={placeholder}
              returnKeyType="search"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                onSearch(text);
              }}
              error={!!errors.search}
              errorText={errors?.search?.message}
              autoCapitalize="none"
              onSubmit={handleSubmit(onSubmit)}
            />
            <View style={styles.right}>
              <View style={[styles.input, styles.rightContainer]}>
                {searchLoading ? (
                  <ActivityIndicator style={styles.loading} />
                ) : value.length > 0 ? (
                  <IconButton
                    icon="close"
                    onPress={() => {
                      onChange('');
                      onSearch('');
                    }}
                  />
                ) : (
                  <View />
                )}
              </View>
            </View>
          </View>
        )}
        name="search"
        defaultValue=""
      />
    </View>
  );
};

export default memo(SearchFrom);

const styles = {
  container: {
    width: '100%',
    position: 'absolute',
    top: 75,
  },
  input: {
    marginHorizontal: 30,
  },
  right: {position: 'absolute', right: 0},
  rightContainer: {paddingVertical: 25},
  loading: {paddingVertical: 10, paddingHorizontal: 15},
};
