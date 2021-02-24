import * as React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {AppTextInput, AppButton} from '../../../components';

const UrlForm = ({onSubmit, defaultValue = {}, loading}) => {
  const {control, handleSubmit, errors} = useForm();

  return (
    <>
      <View style={{flex: 1, width: '100%'}}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'URL'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => onChange(text)}
              error={!!errors.url}
              errorText={errors?.url?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="url"
          rules={{
            required: {value: true, message: 'URL is required'},
          }}
          defaultValue={defaultValue.url}
        />
      </View>

      <AppButton
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        loading={loading}>
        Next
      </AppButton>
    </>
  );
};

export default UrlForm;
