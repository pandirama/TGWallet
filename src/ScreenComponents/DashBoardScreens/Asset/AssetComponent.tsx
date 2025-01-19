import React, {useState} from 'react';
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
import Scan from '../../../assets/scan.svg';
import AddWallet from '../../../assets/add_wallet.svg';
import TokenBranded from '../../../assets/token_branded.svg';
import Buy from '../../../assets/buy.svg';
import Send from '../../../assets/send.svg';
import Eye from '../../../assets/eye.svg';
import Transaction from '../../../assets/profile/transaction.svg';
import DEFIComponent from './DEFIComponent';
import NFTComponent from './NFTComponent';
import { Feather, Foundation, Ionicons, MaterialIcons } from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'ASSET'>;

const assets = [
  {
    id: 0,
    assetName: 'DEFI',
  },
  {
    id: 1,
    assetName: 'Assets',
  },
  {
    id: 2,
    assetName: 'NFT',
  },
];

const AssetComponent = ({navigation}: Props) => {
  const [selectedAsset, setSelectedAsset] = useState('DEFI');

  const renderItem = ({item}: any) => {
    const findAsset = selectedAsset === item?.assetName;
    return (
      <View>
        <TouchableOpacity
          style={styles.assetItemTouch}
          onPress={() => {
            setSelectedAsset(item?.assetName);
          }}>
          <Text
            style={
              findAsset ? styles.selectedAssetItemTxt : styles.assetItemTxt
            }>
            {item?.assetName}
          </Text>
        </TouchableOpacity>
        {findAsset && <View style={styles.verticalView} />}
      </View>
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
        <View style={styles.headerView}>
          <View style={styles.headerLeftIconTopView}>
            <View style={styles.headerLeftIconView}>
              <TouchableOpacity style={styles.brandIcon}>
                <TokenBranded width={28} height={28} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowIcon}>
                <Ionicons
                  name={'caret-forward-sharp'}
                  size={18}
                  color={'#7E7F82'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerRightIconView}>
            <TouchableOpacity style={styles.walletIcon}>
              <AddWallet width={28} height={28} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Scan width={28} height={28} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[appStyles.boxShadow, styles.headerContainer]}>
          <View style={styles.walletNameView}>
            <Text style={styles.walletNameTxt}>WalletNameETH11</Text>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={26}
              color={'#FFFFFF'}
            />
          </View>

          <View style={styles.amountView}>
            <Foundation name={'dollar'} size={38} color={'#FFFFFF'} />
            <Text style={styles.menuAmountTxt}>384,190</Text>
            <Eye width={30} height={30} />
          </View>

          <View style={[appStyles.boxShadow, styles.headerSubContainer]}>
            <TouchableOpacity style={styles.menuItemTouch}>
              <Send width={28} height={28} />
              <Text style={styles.menuItemTxt}>Send</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <TouchableOpacity style={styles.menuItemTouch}>
              <Ionicons
                name={'arrow-down-outline'}
                size={26}
                color={'#333333'}
              />
              <Text style={styles.menuItemTxt}>Receive</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <TouchableOpacity style={styles.menuItemTouch}>
              <Buy width={28} height={28} />
              <Text style={styles.menuItemTxt}>Buy</Text>
            </TouchableOpacity>
            <View style={styles.horizontalBorder} />
            <TouchableOpacity style={styles.menuItemTouch}>
              <Transaction width={28} height={28} />
              <Text style={styles.menuItemTxt}>Swap</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listHeaderView}>
          <View style={styles.listView}>
            <FlatList
              data={assets}
              renderItem={renderItem}
              keyExtractor={(item: any) => item?.id}
              horizontal={true}
            />
          </View>

          <TouchableOpacity style={styles.addIcon}>
            <Feather name={'plus'} size={20} color={'#333333'} />
          </TouchableOpacity>
        </View>
        {selectedAsset === 'DEFI' && <DEFIComponent />}
        {selectedAsset === 'Assets' && <></>}
        {selectedAsset === 'NFT' && <NFTComponent navigation={navigation} />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: colors.white,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'center',
    flex: 1,
  },
  headerLeftIcon: {
    marginLeft: 10,
    alignSelf: 'center',
    padding: 5,
  },
  headerRightTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
    marginRight: 20,
  },
  headerContainer: {
    backgroundColor: colors.black,
    borderRadius: 10,
    margin: 20,
    paddingBottom: 15,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  headerSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  headerRightIconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  headerLeftIconTopView: {
    flex: 1,
    flexDirection: 'row',
  },
  headerLeftIconView: {
    borderRadius: 17,
    backgroundColor: '#EFF2F5',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  brandIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  arrowIcon: {
    marginRight: 5,
  },
  walletIcon: {
    marginRight: 10,
  },
  horizontalBorder: {
    borderWidth: 0.5,
    width: 1,
    height: 25,
    borderColor: colors.gray1,
  },
  menuItemTouch: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
  },
  menuAmountTxt: {
    fontSize: 28,
    fontWeight: 700,
    color: '#FFFFFF',
    marginRight: 5,
    marginLeft: 5,
  },
  walletNameTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#FFFFFF',
  },
  walletNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  amountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  assetItemTouch: {
    padding: 10,
  },
  selectedAssetItemTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333333',
  },
  assetItemTxt: {
    fontSize: 14,
    fontWeight: 600,
    color: '#7C8FAC',
  },
  verticalView: {
    width: 25,
    height: 3,
    backgroundColor: '#333333',
    alignSelf: 'center',
    borderRadius: 5,
  },
  listHeaderView: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  listView: {
    width: '88%',
  },
  addIcon: {
    marginBottom: 15,
    padding: 10,
  },
});

export default AssetComponent;
