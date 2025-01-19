/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/colors';
import NFTNotFound from '../../../assets/nftnotfound.svg';
import appStyles from '../../../utils/appStyles';
import NFTName from '../../../assets/NFT_name.svg';

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

const NFTComponent = ({navigation}: any) => {
  const [showNFTs, setShowNFTs] = useState(false);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.walletTouch}
        onPress={() => navigation.navigate('NFTDETAILS')}>
        <NFTName width={30} height={30} />
        <View style={styles.nftNameView}>
          <Text style={styles.nftNameTxt}>{item?.nftName}</Text>
        </View>
        <Text style={styles.nftNameTxt}>0</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.nftView}>
      {showNFTs ? (
        <View style={styles.listView}>
          <FlatList
            data={NFTs}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            ItemSeparatorComponent={() => {
              return <View style={styles.borderView} />;
            }}
          />
        </View>
      ) : (
        <>
          <NFTNotFound />
          <Text style={styles.noTxt}>No NFT Found</Text>
          <TouchableOpacity
            style={[appStyles.boxShadow, styles.nftTouch]}
            onPress={() => navigation.navigate('ADDNFT')}>
            <Text style={styles.addTxt}>Add NFT</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nftView: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nftTouch: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.gray1,
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTxt: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'center',
  },
  noTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'center',
    marginTop: 15,
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
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
    width: '100%',
  },
  listView: {
    width: '95%',
  },
});

export default NFTComponent;
