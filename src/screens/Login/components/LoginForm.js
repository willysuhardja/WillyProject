import * as React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {AppTextInput, AppButton} from '../../../components';
import {TextInput} from 'react-native-paper';
import {emailRegexValidator} from '../../../utils/regex';

const LoginForm = ({onSubmit, loading}) => {
  const {control, handleSubmit, errors} = useForm();

  const [showPassword, setShowPassword] = React.useState(false);

  const _onShowPasswordToggled = () => setShowPassword(!showPassword);
  return (
    <>
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
            onChangeText={(text) => onChange(text)}
            error={!!errors.username}
            errorText={errors?.username?.message}
            autoCapitalize="none"
            disabled={loading}
          />
        )}
        name="username"
        rules={{
          required: {value: true, message: 'username is required'},
        }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <AppTextInput
            label="Password"
            mode="outlined"
            returnKeyLabel="Done"
            returnKeyType="done"
            onBlur={onBlur}
            value={value}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                onPress={_onShowPasswordToggled}
                name={showPassword ? 'eye' : 'eye-off'}
              />
            }
            onChangeText={(text) => onChange(text)}
            error={!!errors.password}
            errorText={errors?.password?.message}
            autoCapitalize="none"
            disabled={loading}
          />
        )}
        name="password"
        rules={{required: {value: true, message: 'Password is required'}}}
        defaultValue=""
      />

      <AppButton
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        loading={loading}>
        Sign In
      </AppButton>
    </>
  );
};

export default LoginForm;
