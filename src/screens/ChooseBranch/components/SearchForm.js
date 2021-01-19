import * as React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {AppTextInput} from '../../../components';

const SearchFrom = ({onSubmit, loading}) => {
  const {control, handleSubmit, errors} = useForm();
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <AppTextInput
            inputStyle={styles.input}
            mode="outlined"
            returnKeyLabel="Search"
            placeholder="Search Data"
            returnKeyType="search"
            onBlur={onBlur}
            value={value}
            onChangeText={(text) => onChange(text)}
            error={!!errors.search}
            errorText={errors?.search?.message}
            autoCapitalize="none"
            disabled={loading}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
        name="search"
        defaultValue=""
      />
    </View>
  );
};

export default SearchFrom;

const styles = {
  container: {
    width: '100%',
    position: 'absolute',
    top: 75,
  },
  input: {
    marginHorizontal: 30,
  },
};
