import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TEXTS } from '../constants/texts';
import Recover from '../assets/recover_Pharse.svg';
import { moderateScale } from 'react-native-size-matters';

const RecoveryPharseComponent = ({}: any) => {
  return (
    <View>
      <Recover width={'100%'} />
  <Text style={styles.recoverTitleTxt}>{TEXTS.BACKUP_RECOVERY_PHRASE}</Text>
      <Text style={styles.recoversubTitleTxt}>
        Recovery Phrase is the credientials to recover the wallet, and it is
        only saved in your device. Please make sure to make a backup so that you
        can recover it in the future
      </Text>
      <View style={styles.importantView}>
  <Text style={styles.impTitleTxt}>{TEXTS.IMPORTANT}</Text>
        <Text style={styles.impSubTitleTxt}>
          Anyone who has the mnemonic can take control of your wallets.
        </Text>
      </View>
  <Text style={styles.suggestTitleTxt}>{TEXTS.SUGGESTED_BACKUP_METHOD}</Text>
      <Text style={styles.suggestTxt}>
        {'\u25CF'}
        {'   '} Using pen and paper, write Recovery Phrase correctly in order
      </Text>
      <Text style={styles.suggestTxt}>
        {'\u25CF'}
        {'   '} Keep Recovery Phrase in a safe place
      </Text>
      <Text style={styles.suggestTxt}>
        {'\u25CF'}
        {'   '} Do not save or send Recovery Phrase on the internet
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  recoverTitleTxt: {
    color: '#333333',
    fontSize: moderateScale(14),
    fontWeight: 600,
    marginTop: 20,
    marginRight: 20,
  },
  recoversubTitleTxt: {
    color: '#7C8FAC',
    fontSize: moderateScale(12),
    fontWeight: 400,
    marginTop: 3,
    marginBottom: 3,
    marginRight: 20,
  },
  importantView: {
    backgroundColor: '#FDEDED',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginTop: 20,
  },
  impTitleTxt: {
    color: '#D32F2F',
    fontSize: moderateScale(14),
    fontWeight: 600,
    marginLeft: 5,
    marginRight: 20,
  },
  impSubTitleTxt: {
    color: '#D32F2F',
    fontSize: moderateScale(12),
    fontWeight: 400,
    marginLeft: 5,
    marginTop: 3,
    marginRight: 20,
  },
  suggestTitleTxt: {
    color: '#333333',
    fontSize: moderateScale(14),
    fontWeight: 600,
    marginTop: 15,
    marginBottom: 3,
    marginRight: 20,
  },
  suggestTxt: {
    color: '#7C8FAC',
    fontSize: moderateScale(12),
    fontWeight: 400,
    marginTop: 3,
    marginRight: 20,
  },
});

export default RecoveryPharseComponent;
