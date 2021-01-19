import React, {memo, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {AppTextInput, AppButton} from '../../../components';

const UpdateProfileForm = ({onSubmit, defaultValues = {}, loading}) => {
  const {control, handleSubmit, errors, reset} = useForm();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1, width: '100%'}}>
      <View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'Fullname'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.name}
              errorText={errors?.name?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="name"
          rules={{
            required: {value: true, message: 'Fullname is required'},
          }}
          defaultValue={defaultValues.name}
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'Username'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.username}
              errorText={errors?.username?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="username"
          rules={{
            required: {value: true, message: 'Username is required'},
          }}
          defaultValue={defaultValues.username}
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'Email'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.email}
              errorText={errors?.email?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="email"
          rules={{
            required: {value: true, message: 'Email is required'},
          }}
          defaultValue={defaultValues.email}
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'Phone'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.phone}
              errorText={errors?.phone?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="phone"
          rules={{
            required: {value: true, message: 'Phone is required'},
          }}
          defaultValue={defaultValues.phone}
        />
      </View>

      <AppButton
        mode="contained"
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        loading={loading}>
        Save
      </AppButton>
    </View>
  );
};

export default memo(UpdateProfileForm);
