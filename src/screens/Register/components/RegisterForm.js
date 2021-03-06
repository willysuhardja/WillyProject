import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {AppButton, AppRadioButton, AppTextInput} from '../../../components';
import {emailRegexValidator} from '../../../utils/regex';

export default function RegisterForm({onSubmit, loading}) {
  const {errors, handleSubmit, control} = useForm();
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
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <AppTextInput
            label={'Email'}
            placeholder={'aden@mail.com'}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={!!errors.email}
            errorText={errors?.email?.message}
          />
        )}
        name="email"
        rules={{
          required: {value: true, message: 'email is required'},
          pattern: {
            value: emailRegexValidator,
            message: 'Email is not valid',
          },
        }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <AppTextInput
            label={'Password'}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={!!errors.password}
            errorText={errors?.password?.message}
            secureTextEntry
          />
        )}
        name="password"
        rules={{
          required: {value: true, message: 'password is required'},
        }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({onChange, value}) => (
          <>
            <AppRadioButton
              value="lakilaki"
              label={'Laki-laki'}
              onChange={onChange}
              checked={value === 'lakilaki'}
            />
            <AppRadioButton
              value="perempuan"
              onChange={onChange}
              label={'Perempuan'}
              checked={value === 'perempuan'}
            />
            <AppRadioButton
              value="others"
              onChange={onChange}
              label={'Lainnya'}
              checked={value === 'others'}
            />
          </>
        )}
        name="gender"
        rules={{
          required: {value: true, message: 'gender is required'},
        }}
        defaultValue="lakilaki"
      />
      <AppButton
        loading={loading}
        disabled={loading}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Buat Akun
      </AppButton>
    </>
  );
}
