/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import NFTName from '../../../assets/NFT_name.svg';
import Search from '../../../assets/search.svg';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {EvilIcons, Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'ADDNFT'>;

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

const AddNFTComponent = ({navigation}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.walletTouch}>
        <NFTName width={30} height={30} />
        <View style={styles.nftNameView}>
          <Text style={styles.nftNameTxt}>{item?.nftName}</Text>
          <Text style={styles.nftValueTxt}>{item?.nftValue}</Text>
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex:1}}>
          <DashBoardHeaderComponent title={'NFT'} />
          <View style={styles.walletContainer}>
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() =>
                  navigation.navigate('NFTs', {
                    title: 'My NFT',
                  })
                }>
                <Text style={styles.walletTitleTxt}>My NFT</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={25}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() =>
                  navigation.navigate('NFTs', {
                    title: 'All NFT',
                  })
                }>
                <Text style={styles.walletTitleTxt}>All NFT</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={25}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity
                style={styles.walletTouch}
                onPress={() => navigation.navigate('ADDNEWNFT')}>
                <Text style={styles.walletTitleTxt}>Custom NFT</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={25}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.networkTxt}>Hot NFT</Text>
          <View
            style={[
              appStyles.boxShadow,
              styles.walletSubContainer,
              styles.walletSubContainer1,
            ]}>
            <FlatList
              data={NFTs}
              renderItem={renderItem}
              ItemSeparatorComponent={() => {
                return <View style={styles.borderView} />;
              }}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View style={styles.searchView}>
                  <View style={styles.searchContainer}>
                    <Search width={25} height={25} />
                    <TextInput
                      style={styles.input}
                      placeholder="Search"
                      placeholderTextColor="#A9A9A9"
                      value={searchTerm}
                      onChangeText={text => setSearchTerm(text)}
                    />
                  </View>
                </View>
              }
            />
          </View>
        </KeyboardAvoidingView>
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
  },
  walletSubContainer1: {
    margin: 20,
    marginBottom: 5,
    flex: 1,
  },
  walletTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 8,
  },
  networkTxt: {
    fontSize: 15,
    fontWeight: 600,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 23,
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
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    marginRight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    borderRadius: 25, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
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
  nftNameView: {
    flex: 1,
    marginLeft: 10,
  },
});

export default AddNFTComponent;
