import React, {forwardRef} from 'react';
import {Text, TextInput} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {colors} from '../utils/colors';
import {fontFamily} from '../utils/appStyles';

const TextInputComponent = forwardRef((props: any, ref: any) => {
  const {onChangeValue, value, placeHolder, headText, icon, ...otherProps} =
    props ?? {};
  return (
    <View style={styles.inputView}>
      {icon}
      <TextInput
        style={styles.input}
        onChangeText={onChangeValue}
        placeholder={placeHolder}
        value={value}
        ref={tRef => {
          if (ref) {
            ref.current = tRef;
          }
        }}
        {...otherProps}
      />
      <Text style={styles.inputHeadTxt}>{headText}</Text>
    </View>
  );
});

export default TextInputComponent;

const styles = StyleSheet.create({
  inputView: {
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    marginTop: 40,
  },
  icon: {
    marginLeft: 5,
  },
  inputHeadTxt: {
    position: 'absolute',
    top: -15,
    left: 15,
    backgroundColor: colors.background,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    paddingTop: 2,
    color: colors.inputBorder,
    fontSize: 16,
    fontFamily: fontFamily.poppins_semi_bold,
  },
  input: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    flex: 1,
  },
});
