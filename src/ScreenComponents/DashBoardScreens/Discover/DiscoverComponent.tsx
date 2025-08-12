/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';

type Props = NativeStackScreenProps<any, 'DISCOVER'>;

const DiscoverComponent = ({}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView
        style={[
          appStyles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Text style={styles.headerRightTxt}>Coming Soon...</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topView: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  bottomView: {
    marginTop: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 50, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    flex: 1,
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
    paddingVertical: 13,
    color: colors.black,
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: '#333333',
    marginBottom: 5,
  },
  subTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    marginBottom: 25,
  },
  inputTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginBottom: 1,
    marginTop: 20,
    marginLeft: 5,
    lineHeight: 20,
  },
  startedTouch: {
    width: '100%',
    marginTop: 15,
  },
  startedBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '88%',
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  readAgreeView: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  readAgreeTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 3,
  },
  agreeTxt: {
    color: '#ED1C24',
    fontSize: 14,
    fontWeight: 400,
  },
  touchOpacity: {
    opacity: 0.5,
  },
  headerRightTxt: {
    fontSize: 16,
    fontWeight: 900,
    color: '#333333',
  },
});

export default DiscoverComponent;
