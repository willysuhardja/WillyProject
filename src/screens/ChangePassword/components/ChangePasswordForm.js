import React, {memo} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {AppTextInput, AppButton} from '../../../components';

const ChangePasswordForm = ({onSubmit, loading}) => {
  const {control, handleSubmit, errors} = useForm();

  return (
    <View style={{justifyContent: 'space-between', flex: 1, width: '100%'}}>
      <View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'Old Password'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.old_password}
              errorText={errors?.old_password?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="old_password"
          defaultValue=""
          rules={{
            required: {value: true, message: 'Old Password is required'},
          }}
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'New Password'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.new_password}
              errorText={errors?.new_password?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="new_password"
          defaultValue=""
          rules={{
            required: {value: true, message: 'New Password is required'},
          }}
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'Confirm Password'}
              mode="outlined"
              returnKeyLabel="Next"
              returnKeyType="next"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.confirm_password}
              errorText={errors?.confirm_password?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="confirm_password"
          defaultValue=""
          rules={{
            required: {value: true, message: 'Confirm Your Password'},
          }}
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

export default memo(ChangePasswordForm);
