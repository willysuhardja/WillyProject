import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {AppTextInput, AppButton} from '../../../components';

const FormNote = ({
  onSubmit,
  loading,
  defaultValue = {title: '', notes: ''},
}) => {
  const {control, handleSubmit, errors} = useForm();
  return (
    <>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <AppTextInput
            mode="outlined"
            returnKeyLabel="Next"
            returnKeyType="next"
            onBlur={onBlur}
            value={value}
            label="Title"
            placeholder="Please enter title"
            onChangeText={(text) => onChange(text)}
            error={!!errors.title}
            errorText={errors?.title?.message}
            autoCapitalize="none"
            disabled={loading}
          />
        )}
        name="title"
        rules={{
          required: {value: true, message: 'Title is required'},
        }}
        defaultValue={defaultValue.title}
      />

      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <AppTextInput
            mode="outlined"
            returnKeyLabel="Done"
            returnKeyType="done"
            onBlur={onBlur}
            value={value}
            label="Notes"
            multiline={true}
            placeholder="Please enter notes"
            onChangeText={(text) => onChange(text)}
            error={!!errors.content}
            errorText={errors?.content?.message}
            inputStyle={{height: '100%'}}
            containerStyle={{flex: 1}}
            autoCapitalize="none"
            disabled={loading}
          />
        )}
        name="notes"
        rules={{
          required: {value: true, message: 'notes is required'},
        }}
        defaultValue={defaultValue.notes}
      />

      <AppButton
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        loading={loading}>
        Save
      </AppButton>
    </>
  );
};

export default FormNote;
