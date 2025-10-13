import React from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import {colors} from '../../../../utils/colors';
import appStyles from '../../../../utils/appStyles';
import RecoveryPharseComponent from '../../../../components/RecoveryPharseComponent';
import { moderateScale } from 'react-native-size-matters';

type Props = NativeStackScreenProps<any, 'EXPORT_SECRET_PHARSE'>;

const ExportSecretPharseComponent = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const {walletInfo} = route?.params ?? {};
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <DashBoardHeaderComponent title={t('BACKUP_SECRET_RECOVERY_PHRASE')} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={styles.container}>
            <RecoveryPharseComponent />
          </View>
          <TouchableOpacity
            style={styles.startedTouch}
            onPress={() => {
              navigation.navigate('COPY_SECRET_PHARSE', {
                walletInfo: walletInfo,
              });
            }}>
            <LinearGradient
              colors={['#6B121C', '#ED1C24']}
              style={styles.startedBtn}>
              <Text style={styles.startedBtnTxt}>{t('NEXT')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  startedTouch: {
    width: '100%',
    marginTop: 30,
  },
  startedBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '88%',
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: moderateScale(16),
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default ExportSecretPharseComponent;
