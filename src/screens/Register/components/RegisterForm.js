import React from 'react';
import {Alert} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {AppButton, AppTextInput} from '../../../components';

export default function RegisterForm() {
  const {errors, handleSubmit, control} = useForm();

  const onSubmit = (data) => {
    Alert.alert('Berhasil Submit', JSON.stringify(data));
  };

  return (
    <>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <AppTextInput
            label={'Name'}
            placeholder={'Aden Trisna'}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={!!errors.name}
            errorText={errors?.name?.message}
          />
        )}
        name="name"
        rules={{
          required: {value: true, message: 'name is required'},
        }}
        defaultValue=""
      />
      <AppButton mode="contained" onPress={handleSubmit(onSubmit)}>
        Buat Akun
      </AppButton>
    </>
  );
}
