import React, {Fragment, memo} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View, FlatList, Dimensions} from 'react-native';
import {IconButton, Title, TouchableRipple} from 'react-native-paper';
import {AppTextInput, AppLoadingBasic} from '../../../components';
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
                  placeholder="QTY"
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
                  inputStyle={{
                    height: 50,
                  }}
                />
                <KeyBoardCustom
                  loading={loading}
                  onKeyNumberPressed={_onKeyNumberPressed}
                  onKeyDeletePressed={_onKeyDeletePressed}
                  onKeySubmitPressed={handleSubmit(onSubmit)}
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
    </View>
  );
};

export default memo(QtyForm);

const KeyBoardCustom = ({
  loading,
  onKeyNumberPressed = () => {},
  onKeyDeletePressed = () => {},
  onKeySubmitPressed = () => {},
}) => {
  if (loading) {
    return <AppLoadingBasic />;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <FlatList
        scrollEnabled={false}
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
        <TouchableRipple
          style={[
            styles.keyboardButton,
            {height: (SCREEN_WIDTH / 4 - 40) * 2 + 10},
          ]}
          onPress={onKeySubmitPressed}>
          <IconButton icon="subdirectory-arrow-left" />
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
    height: SCREEN_WIDTH / 4 - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
