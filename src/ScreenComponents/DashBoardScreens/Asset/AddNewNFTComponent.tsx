import React, {useState} from 'react';
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
import Scan from '../../../assets/scan.svg';
import appStyles from '../../../utils/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<any, 'ADDNEWNFT'>;

const {height} = Dimensions.get('window');

const AddNewNFTComponent = ({}: Props) => {
  const [contractAddress, setContractAddress] = useState('');
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent
          title={'Add NFT'}
          rightIcon={<Scan width={24} height={24} style={styles.scanIcon} />}
        />
        <Text style={styles.addNFTHeaderTxt}>Add NFT</Text>
        <Text style={styles.addNFTSubHeaderTxt}>
          Enter the NFT contract you want to add
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter contract address"
            placeholderTextColor="#9C9DA0"
            value={contractAddress}
            multiline={true}
            onChangeText={text => {
              setContractAddress(text);
            }}
          />
        </View>
        <TouchableOpacity style={styles.startedTouch}>
          <LinearGradient
            colors={['#6B121C', '#ED1C24']}
            style={styles.startedBtn}>
            <Text style={styles.startedBtnTxt}>Confirm</Text>
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
    height: 150,
    paddingVertical: 13,
    color: colors.black,
    textAlignVertical: 'top',
  },
  startedTouch: {
    width: '100%',
    marginTop: height / 2.5,
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
});

export default AddNewNFTComponent;
