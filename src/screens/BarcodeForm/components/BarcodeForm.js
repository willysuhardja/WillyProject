import * as React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {Subheading} from 'react-native-paper';
import {AppTextInput, AppButton} from '../../../components';

const BarcodeForm = ({
  onSubmit,
  defaultValues = {},
  loading,
  onButtonScanTapped,
}) => {
  const {control, handleSubmit, errors} = useForm();

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <AppTextInput
              label={'Scanned Barcode'}
              mode="outlined"
              returnKeyLabel="Next"
              autoFocus={true}
              returnKeyType="next"
              onBlur={onBlur}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              error={!!errors.barcode}
              errorText={errors?.barcode?.message}
              autoCapitalize="none"
              disabled={loading}
            />
          )}
          name="barcode"
          rules={{
            required: {value: true, message: 'Barcode is required'},
          }}
          defaultValue={defaultValues.barcode}
        />

        <Subheading style={styles.orText}>OR</Subheading>

        <AppButton disabled={loading} onPress={onButtonScanTapped} mode="Text">
          Scan With Your Camera
        </AppButton>
      </View>

      <AppButton
        mode="contained"
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        loading={loading}>
        Submit
      </AppButton>
    </View>
  );
};

export default BarcodeForm;

const styles = {
  container: {justifyContent: 'space-between', flex: 1, width: '100%'},
  orText: {textAlign: 'center'},
};
