import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import {colors} from '../utils/colors';
import {Ionicons} from '../utils/IconUtils';
import { moderateScale } from 'react-native-size-matters';

const ModalComponent = (props: any) => {
  const {visibility, onDismiss, onConfirm, titleTxt, children} = props;
  const { t } = useTranslation();
  return (
    <Modal
      isVisible={visibility}
      onBackdropPress={onDismiss}
      animationInTiming={500}
      animationOutTiming={700}
      useNativeDriver={true}>
      <View style={styles.container}>
        <View style={styles.actionTitleView}>
          <Text style={styles.titleTxt}>{titleTxt}</Text>
          <TouchableOpacity onPress={onDismiss} style={styles.closeTouch}>
            <Ionicons name={'close'} size={20} color={'#9C9DA0'} />
          </TouchableOpacity>
        </View>
        {children}
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.cancelTouch} onPress={onDismiss}>
            <Text style={styles.cancelTxt}>{t('CANCEL')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmTouch} onPress={onConfirm}>
            <Text style={styles.confirmTxt}>{t('CONFIRM')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  titleTxt: {
    fontSize: moderateScale(14),
    color: '#333333',
    flex: 1,
    textAlign: 'center',
    fontWeight: 700,
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 35,
  },
  cancelTouch: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderRightWidth: 1,
    borderColor: colors.gray1,
    borderTopWidth: 1,
  },
  cancelTxt: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: moderateScale(14),
    color: '#9C9DA0',
  },
  confirmTouch: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: colors.gray1,
    borderTopWidth: 1,
  },
  confirmTxt: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: moderateScale(14),
    color: '#0054A6',
  },
  actionTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  closeTouch: {
    padding: 5,
  },
});

export default ModalComponent;
