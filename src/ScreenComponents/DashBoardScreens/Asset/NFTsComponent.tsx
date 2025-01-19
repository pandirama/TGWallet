/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
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
import NFTName from '../../../assets/NFT_name.svg';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import { EvilIcons } from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'NFTs'>;

const NFTs = [
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'plus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'minus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'plus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'minus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'plus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'minus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'plus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'minus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'plus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'minus',
  },
  {
    nftName: '[NFT Name]',
    nftValue: '0dsksi39gsg...f9b9sk34lr',
    icon: 'plus',
  },
];

const NFTsComponent = ({route}: Props) => {
  const {title} = route?.params ?? {};
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.walletTouch}>
        <NFTName width={30} height={30} />
        <View style={styles.nftNameView}>
          <Text style={styles.nftNameTxt}>{item?.nftName}</Text>
          <Text style={styles.nftValueTxt}>{item?.nftValue}</Text>
          <Text style={styles.nftBalanceTxt}>Balance: 0</Text>
        </View>
        <EvilIcons
          name={item?.icon === 'plus' ? 'plus' : 'minus'}
          size={25}
          color={item?.icon === 'plus' ? '#ED1C24' : '#7C8FAC'}
          style={styles.icon}
        />
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
        <DashBoardHeaderComponent title={title} />
        <View style={styles.walletContainer}>
          <Text style={styles.networkTxt}>Asset List</Text>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <FlatList
              data={NFTs}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={styles.borderView} />;
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 155,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 8,
  },
  networkTxt: {
    fontSize: 15,
    fontWeight: 600,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 5,
    marginTop: 25,
  },
  icon: {
    marginRight: 15,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
  },
  nftNameView: {
    flex: 1,
    marginLeft: 10,
  },
  nftNameTxt: {
    fontSize: 12,
    fontWeight: 500,
    color: '#333333',
  },
  nftValueTxt: {
    fontSize: 10,
    fontWeight: 400,
    color: '#7C8FAC',
  },
  nftBalanceTxt: {
    fontSize: 10,
    fontWeight: 400,
    color: '#333333',
  },
});

export default NFTsComponent;
