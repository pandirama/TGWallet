import React, {forwardRef} from 'react';
import {Text, TextInput} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';

const TextInputComponent = forwardRef((props: any, ref: any) => {
  const {onChangeValue, value, placeHolder, errorTxt, ...otherProps} =
    props ?? {};
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeValue}
        placeholder={placeHolder}
        value={value}
        placeholderTextColor={'#7f7f7f'}
        ref={tRef => {
          if (ref) {
            ref.current = tRef;
          }
        }}
        {...otherProps}
      />
      {errorTxt && <Text style={styles.errorTxt}>{errorTxt}</Text>}
    </View>
  );
});

export default TextInputComponent;

const styles = StyleSheet.create({
  inputView: {
    borderWidth: 1.5,
    borderColor: colors.gray1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  errorTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#F04438',
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: 500,
    color: colors.black,
  },
});
