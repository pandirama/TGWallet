import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import { Ionicons } from '../utils/IconUtils';

const DashBoardHeaderComponent = ({title, rightIcon}: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backTouch}
        onPress={() => navigation.goBack()}>
        <Ionicons name={'chevron-back'} size={22} color={colors.black} />
      </TouchableOpacity>
      <Text style={styles.titleTxt}>{title}</Text>
      {rightIcon && rightIcon}
    </View>
  );
};

export default DashBoardHeaderComponent;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  backTouch: {
    padding: 10,
    paddingLeft: 16,
  },
  titleTxt: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 600,
    textAlign: 'center',
    flex: 1,
    marginRight: 25,
  },
});
