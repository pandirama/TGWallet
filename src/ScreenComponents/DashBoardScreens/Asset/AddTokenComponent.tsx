/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../utils/colors';
// import Scan from '../../../assets/scan.svg';
import appStyles from '../../../utils/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  useSaveTokenMutation,
  useValidateTokenMutation,
} from '../../../api/tokenAPI';
import {useSelector} from 'react-redux';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';

type Props = NativeStackScreenProps<any, 'ADDTOKENS'>;

const {height} = Dimensions.get('window');

const AddTokenComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();

  const [contractAddress, setContractAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('');
  const [tokens, setTokens] = useState<any>(null);
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);

  const {walletInfo = {}, userInfo = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  const {network_mode} = walletInfo ?? {};

  const [validateToken, {isLoading}] = useValidateTokenMutation();
  const [saveToken, {isLoading: isSaveLoading}] = useSaveTokenMutation();

  useEffect(() => {
    toggleBackdrop(isLoading || isSaveLoading);
  }, [isLoading || isSaveLoading]);

  const fetchCopiedKey = async () => {
    const text = await Clipboard.getString();
    if (text) {
      setContractAddress(text);
    }
  };

  const checkValidateToken = async () => {
    try {
      const params = {
        userid: userInfo?.generated_Id,
        walletid: walletInfo?.wallet_id,
        address: contractAddress,
      };
      const response: any = await validateToken(params).unwrap();
      if (response?.success) {
        setTokens(response);
        setTokenName(response?.name);
        setTokenDecimals(response?.decimal);
        setShowConfirmBtn(true);
      } else {
        setTokens(null);
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

  const saveCustomToken = async () => {
    try {
      const params = {
        walletid: walletInfo?.wallet_id,
        networkid: network_mode,
        address: contractAddress,
        name: tokens?.name,
        symbol: tokens?.symbol,
        iconimage: tokens?.iconimage,
      };
      const response: any = await saveToken(params).unwrap();
      if (response?.success) {
        showToast({
          type: 'success',
          text1: response?.message,
        });
        setShowConfirmBtn(false);
        navigation.goBack();
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
        <DashBoardHeaderComponent
          title={'Add Token'}
          //   rightIcon={<Scan width={24} height={24} style={styles.scanIcon} />}
        />
        <Text style={styles.addNFTHeaderTxt}>Add Token</Text>
        <Text style={styles.addNFTSubHeaderTxt}>
          Enter the Token contract you want to add
        </Text>
        <View style={styles.multiLineContainer}>
          <TextInput
            style={styles.multiLineInput}
            placeholder="Enter contract address"
            placeholderTextColor="#9C9DA0"
            value={contractAddress}
            multiline={true}
            onChangeText={text => {
              setContractAddress(text);
            }}
          />
          <View style={styles.pasteCard}>
            <TouchableOpacity onPress={() => fetchCopiedKey()}>
              <Text style={styles.pasteTxt}>Paste</Text>
            </TouchableOpacity>
          </View>
        </View>
        {tokens && (
          <>
            <View style={[styles.searchContainer, {marginTop: 15}]}>
              <TextInput
                style={styles.input1}
                placeholder="Enter Token Name"
                placeholderTextColor="#9C9DA0"
                value={tokenName}
                editable={false}
                onChangeText={text => setTokenName(text)}
              />
            </View>
            <View style={[styles.searchContainer, {marginTop: 15}]}>
              <TextInput
                style={styles.input1}
                placeholder="Enter Token Decimals"
                placeholderTextColor="#9C9DA0"
                value={tokenDecimals.toString()}
                editable={false}
                onChangeText={text => setTokenDecimals(text)}
              />
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.startedTouch}
          onPress={() => {
            if (showConfirmBtn) {
              saveCustomToken();
            } else {
              checkValidateToken();
            }
          }}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>
              {showConfirmBtn ? 'Confirm' : 'Validate'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scanIcon: {
    marginRight: 15,
  },
  addNFTHeaderTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: '#333333',
    marginLeft: 15,
    marginTop: 10,
  },
  addNFTSubHeaderTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginLeft: 15,
    marginTop: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginLeft: 10,
    marginRight: 15,
    marginTop: 5,
  },
  input: {
    height: 90,
    color: colors.black,
    textAlignVertical: 'top',
  },
  input1: {
    paddingVertical: 13,
    color: colors.black,
    textAlignVertical: 'top',
  },
  startedTouch: {
    width: '100%',
    marginTop: height / 4,
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
  pasteCard: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pasteTxt: {
    color: '#0054A6',
    fontSize: 12,
    fontWeight: 400,
    marginRight: 10,
  },
  multiLineContainer: {
    backgroundColor: colors.white,
    borderRadius: 8, // Adjust the value to change the roundness
    paddingHorizontal: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginTop: 5,
    height: 130,
    marginLeft: 10,
    marginRight: 15,
  },
  multiLineInput: {
    height: 90,
    marginBottom: 10,
    color: colors.black,
    textAlignVertical: 'top',
  },
});

export default AddTokenComponent;
