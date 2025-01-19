/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import {getErrorMessage} from '../../../utils/common';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {useVerifyMnemonicMutation} from '../../../api/auth/authAPI';
import {Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'CHECK_CODE'>;

// const walletInfo = {
//   network: '1',
//   wallet_id: '196338795536',
//   userid: '1374367752518861',
//   secret_phase: [
//     'endorse',
//     'bag',
//     'debate',
//     'right',
//     'minimum',
//     'bird',
//     'gain',
//     'short',
//     'hire',
//     'sting',
//     'repair',
//     'luggage',
//     'divorce',
//     'abandon',
//   ],
//   phase_count: 12,
// };

const CheckCodeComponent = ({route, navigation}: Props) => {
  const {walletInfo} = route?.params ?? {};
  const {showToast, toggleBackdrop} = useCommon();

  console.log('walletInfo', walletInfo);

  const [updateCodes, setUpdateCodes] = useState<string[]>([]);

  const {userInfo = {}} = useSelector(({authReducer}: any) => authReducer);

  const [verifyMnemonic, {isLoading}] = useVerifyMnemonicMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const completedBackup = async () => {
    try {
      const payload = {
        network_mode: walletInfo?.network,
        wallet_id: walletInfo?.wallet_id,
        userid: userInfo?.generated_Id,
        pharse: walletInfo?.secret_phase,
      };

      const response: any = await verifyMnemonic(payload).unwrap();
      console.log(response);
      if (response?.success) {
        navigation.navigate('DASH_BOARD');
      } else {
        showToast({
          type: 'error',
          text1: response?.message,
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const getIndexTxt = (index: number) => {
    if (index > 8) {
      return `${index + 1}`;
    }
    return `0${index + 1}`;
  };

  const renderUpdatedCodes = (code: string, codeIndex: number) => {
    let hasValue = false;
    let value: any = {};
    let hasError: boolean = false;
    for (let i = 0; i < updateCodes.length; i++) {
      if (i === codeIndex) {
        hasValue = true;
        value = {code: updateCodes[i], index: i};
        break;
      }
    }
    if (hasValue) {
      const pharseIndex = walletInfo?.secret_phase?.findIndex(
        (item: any) => item === value?.code,
      );
      if (pharseIndex !== value?.index) {
        hasError = true;
      } else {
        hasError = false;
      }
      if (hasError) {
        return {hasError, ...value};
      }
      return value;
    }
    return;
  };

  const removeError = (code: string) => {
    const checkedIds: string[] = [...updateCodes];
    const index = checkedIds.indexOf(code);
    if (index !== -1) {
      checkedIds[index] = '';
    }
    setUpdateCodes(checkedIds);
  };

  const renderItemAnswer = ({item, index}: any) => {
    const renderValue = renderUpdatedCodes(item, index);
    return (
      <View
        style={[
          appStyles.boxShadow,
          styles.itemTouch,
          renderValue?.hasError === true && styles.itemErrorTouch,
        ]}>
        <Text style={styles.itemIndexTxt}>{getIndexTxt(index)}</Text>
        <Text style={styles.itemTxt}>{renderValue?.code}</Text>
        {renderValue?.hasError === true && (
          <TouchableOpacity
            style={styles.closeTouch}
            onPress={() => removeError(renderValue?.code)}>
            <Ionicons name={'close-circle'} size={18} color={'#D32F2F'} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const updateCode = (code: string) => {
    const codeArr = [...updateCodes];
    const index = codeArr.indexOf(code);
    const emptyIndex = codeArr.indexOf('');
    if (index !== -1) {
      codeArr[index] = '';
    } else if (emptyIndex !== -1) {
      codeArr[emptyIndex] = code;
    } else {
      codeArr.push(code);
    }
    setUpdateCodes(codeArr);
  };

  const renderItem = ({item, index}: any) => {
    const checkindex = updateCodes?.findIndex(
      (question: any) => question === item,
    );
    if (checkindex > -1) {
      return <View style={styles.itemEmptyTouch} />;
    }
    return (
      <TouchableOpacity
        style={[appStyles.boxShadow, styles.itemTouch]}
        onPress={() => {
          if (updateCodes?.length === 0) {
            setUpdateCodes([...updateCodes, item]);
          } else {
            updateCode(item);
          }
        }}>
        <Text style={styles.itemIndexTxt}>{getIndexTxt(index)}</Text>
        <Text style={styles.itemTxt}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'Check Secret Recovery Phrase'} />
        <View style={styles.tabsView}>
          <Text style={styles.titleTxt}>
            Please write down the mnemonic in correct order on a piece of paper.
          </Text>
          <FlatList
            data={walletInfo?.secret_phase}
            renderItem={renderItemAnswer}
            numColumns={3}
            columnWrapperStyle={styles.flatListColumn}
            contentContainerStyle={styles.flatListCotent}
          />
          <FlatList
            data={walletInfo?.secret_phase}
            renderItem={renderItem}
            numColumns={3}
            columnWrapperStyle={styles.flatListColumn}
            contentContainerStyle={styles.flatListCotent}
          />
        </View>

        <TouchableOpacity style={styles.startedTouch} onPress={completedBackup}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>Complete</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  containerView: {
    marginLeft: 20,
    marginRight: 20,
  },
  tabsView: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  titleTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
  },
  plainTxtView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  plainTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 600,
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  QRcodeTxt: {
    color: '##7C8FAC',
    fontSize: 12,
    fontWeight: 400,
  },
  tabTxt: {
    color: '#333333',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 400,
    paddingTop: 15,
    paddingBottom: 15,
  },
  copyTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 5,
  },
  startedTouch: {
    width: '100%',
    marginBottom: 30,
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
  touchOpacity: {
    opacity: 0.5,
  },
  plainEye: {
    alignSelf: 'center',
  },
  plain: {
    opacity: 0.7,
  },
  qrCode: {
    alignSelf: 'center',
  },
  plainView: {
    marginTop: 5,
  },
  plainEyeView: {
    paddingTop: 15,
    paddingBottom: 15,
    left: 50,
    right: 50,
    top: 20,
    backgroundColor: colors.white,
    position: 'absolute',
    opacity: 0.8,
  },
  qrEyeView: {
    paddingTop: 15,
    paddingBottom: 15,
    left: 50,
    right: 50,
    top: 50,
    backgroundColor: colors.white,
    position: 'absolute',
    opacity: 0.8,
  },
  copyView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importantView: {
    backgroundColor: '#FDEDED',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginTop: 20,
    borderRadius: 5,
  },
  impTitleTxt: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 5,
    marginRight: 20,
  },
  impSubTitleTxt: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: 400,
    marginLeft: 10,
    marginTop: 3,
    marginRight: 20,
  },
  itemTouch: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: colors.white,
  },
  itemErrorTouch: {
    borderColor: '#D32F2F',
  },
  itemEmptyTouch: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333333',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    flex: 1,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderStyle: 'dashed',
  },
  itemIndexTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
    marginLeft: 5,
  },
  itemTxt: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'center',
    flex: 1,
  },
  flatListCotent: {
    marginBottom: 15,
    marginTop: 10,
  },
  flatListColumn: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  qrTouch: {
    flexDirection: 'row',
  },
  plainTouch: {
    flex: 1,
  },
  closeTouch: {
    position: 'absolute',
    top: -8,
    right: 0,
  },
});

export default CheckCodeComponent;
