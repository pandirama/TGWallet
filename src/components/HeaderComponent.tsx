import React from 'react';
import {ImageBackground, Text} from 'react-native';
// import { SvgUri } from 'react-native-svg'
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {fontFamily} from '../utils/appStyles';
import { Ionicons } from '../utils/IconUtils';

const HeaderComponent = ({title, subTitle, screen}: any) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/heade_banner.png')}
      style={styles.imageContainer}>
      {!screen && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtnView}>
          <Ionicons name="arrow-back" size={20} />
        </TouchableOpacity>
      )}

      <View style={[styles.viewContainer, screen && styles.screenTrueView]}>
        <Text style={styles.titleTxt}>{title}</Text>
        <Text style={styles.subTitleTxt}>{subTitle}</Text>
      </View>
    </ImageBackground>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  backBtnView: {
    backgroundColor: colors.white,
    borderRadius: 100,
    padding: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginLeft: 20,
  },
  screenTrueView: {
    marginTop: 50,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  viewContainer: {
    alignItems: 'center',
    flex: 1,
  },
  titleTxt: {
    fontSize: 28,
    color: colors.white,
    fontFamily: fontFamily.poppins_semi_bold,
  },
  subTitleTxt: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.poppins_medium,
  },
});
