import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useTranslation } from 'react-i18next';
import Recover from '../assets/recover_Pharse.svg';
import { moderateScale } from 'react-native-size-matters';

const RecoveryPharseComponent = ({}: any) => {
  const { t } = useTranslation();
  return (
    <View>
      <Recover width={'100%'} />
      <Text style={styles.recoverTitleTxt}>{t('BACKUP_RECOVERY_PHRASE')}</Text>
      <Text style={styles.recoversubTitleTxt}>{t('RECOVERY_PHRASE_SUBTITLE')}</Text>
      <View style={styles.importantView}>
        <Text style={styles.impTitleTxt}>{t('IMPORTANT')}</Text>
        <Text style={styles.impSubTitleTxt}>{t('MNEMONIC_WARNING')}</Text>
      </View>
      <Text style={styles.suggestTitleTxt}>{t('SUGGESTED_BACKUP_METHOD')}</Text>
      <Text style={styles.suggestTxt}>{'\u25CF'}{'   '}{t('BACKUP_METHOD_PAPER')}</Text>
      <Text style={styles.suggestTxt}>{'\u25CF'}{'   '}{t('BACKUP_METHOD_SAFE_PLACE')}</Text>
      <Text style={styles.suggestTxt}>{'\u25CF'}{'   '}{t('BACKUP_METHOD_NO_INTERNET')}</Text>
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
