import React, {Fragment, memo} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View, FlatList, Dimensions} from 'react-native';
import {IconButton, Title, TouchableRipple} from 'react-native-paper';
import {AppTextInput, AppButton} from '../../../components';
import {DefaultTheme} from '../../../theme';
import {keyExtractor} from '../../../utils/flatlist';

const NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];
const SCREEN_WIDTH = Dimensions.get('screen').width;

const QtyForm = ({onSubmit, loading}) => {
  const {control, handleSubmit, errors} = useForm();

  return (
    <View style={{justifyContent: 'space-between', flex: 1, width: '100%'}}>
      <View>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => {
            const _onKeyNumberPressed = (text) => {
              if (text === '.' && value.includes('.')) {
                return;
              }
              if (value.length < 6) {
                onChange(value + text);
              }
            };

            const _onKeyDeletePressed = () => {
              if (value) {
                onChange(value.slice(0, -1));
              }
            };
            return (
              <Fragment>
                <AppTextInput
                  label={'Qty'}
                  mode="solo"
                  returnKeyLabel="Next"
                  returnKeyType="next"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                  error={!!errors.qty}
                  errorText={errors?.qty?.message}
                  autoCapitalize="none"
                  editable={false}
                  focusable={true}
                />
                <KeyBoardCustom
                  onKeyNumberPressed={_onKeyNumberPressed}
                  onKeyDeletePressed={_onKeyDeletePressed}
                />
              </Fragment>
            );
          }}
          name="qty"
          defaultValue=""
          rules={{
            required: {value: true, message: 'Qty is required'},
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

export default memo(QtyForm);

const KeyBoardCustom = ({
  onKeyNumberPressed = () => {},
  onKeyDeletePressed = () => {},
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <FlatList
        data={NUMBER}
        keyExtractor={keyExtractor('keyboard')}
        numColumns={3}
        renderItem={({item}) => {
          return (
            <TouchableRipple
              style={styles.keyboardButton}
              onPress={() => onKeyNumberPressed(item)}>
              <Title>{item}</Title>
            </TouchableRipple>
          );
        }}
      />
      <View>
        <TouchableRipple
          style={styles.keyboardButton}
          onPress={onKeyDeletePressed}>
          <IconButton icon="backspace" />
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = {
  keyboardButton: {
    borderColor: DefaultTheme.colors.grey,
    borderWidth: 0.6,
    margin: 5,
    width: SCREEN_WIDTH / 4 - 30,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
