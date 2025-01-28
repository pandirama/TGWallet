/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import ImportWallet from '../../../assets/import_wallet.svg';
import CreateWallet from '../../../assets/create_wallet.svg';
import Wallet1 from '../../../assets/wallet1.svg';
import Wallet2 from '../../../assets/wallet2.svg';
import {colors} from '../../../utils/colors';
import Carousel from 'react-native-reanimated-carousel';
import _ from 'lodash';
import useCommon from '../../../hooks/useCommon';
import {Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'WALLET_TYPE'>;

type PaginateProp = {
  count: number;
  active: number;
};

const {width} = Dimensions.get('window');

const slideContent: any = [
  {
    title: 'Empowering a Global Crypto Future',
    subTitle:
      'Connect your assets to a digital world. Trade, manage, and grow in a seamless global ecosystem.',
    icon: <Wallet1 />,
  },
  {
    title: 'Unite Your Coins in One Wallet',
    subTitle:
      'Store, manage, and explore multiple cryptocurrencies effortlessly with cutting-edge technology at your fingertips.',
    icon: <Wallet2 />,
  },
];

const PaginationDots = (props: PaginateProp) => {
  return (
    <View style={styles.dotContainer}>
      {_.map(new Array(props.count), (_val: any, index: any) => (
        <>
          {index + 1 === props.active ? (
            <View style={styles.activeDot} />
          ) : (
            <View key={index + 1} style={styles.dot} />
          )}
        </>
      ))}
    </View>
  );
};

const WalletTypeComponent = ({navigation}: Props) => {
  const {toggleBackdrop} = useCommon();
  const [activeDot, setActiveDot] = useState(1);

  useEffect(() => {
    toggleBackdrop(false);
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={styles.caroselContainer}>
            <Carousel
              width={width}
              height={450}
              loop={false}
              data={slideContent}
              scrollAnimationDuration={1000}
              onProgressChange={(_, absoluteProgress) => {
                setActiveDot(Math.round(absoluteProgress) + 1);
              }}
              renderItem={({index}) => (
                <View style={styles.carouselContainer}>
                  <View style={styles.imageView}>
                    {slideContent[index].icon}
                  </View>

                  <View style={styles.pageDotView}>
                    <Text style={styles.titleTxt}>
                      {slideContent[index].title}
                    </Text>
                    <Text style={styles.subTitleTxt}>
                      {slideContent[index].subTitle}
                    </Text>
                  </View>
                </View>
              )}
            />
            <PaginationDots count={2} active={activeDot} />
          </View>

          <View style={styles.walletContainer}>
            <Text style={styles.headerTxt}>I have my own wallet</Text>
            <TouchableOpacity
              style={[appStyles.boxShadow, styles.walletSubContainer]}
              onPress={() => navigation.navigate('IMPORT_WALLET')}>
              <ImportWallet width={45} height={45} />
              <View style={styles.txtContainer}>
                <Text style={styles.walletTitleTxt}>
                  Import Existing Wallet
                </Text>
                <Text style={styles.walletSubTitleTxt}>
                  Import Wallet, keypal 7 MultiSig wallet
                </Text>
              </View>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={colors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTxt}>I need a new wallet</Text>
            <TouchableOpacity
              style={[appStyles.boxShadow, styles.walletSubContainer]}
              onPress={() => navigation.navigate('SELECT_NETWORK')}>
              <CreateWallet width={45} height={45} />
              <View style={styles.txtContainer}>
                <Text style={styles.walletTitleTxt}>Create New Wallet</Text>
                <Text style={styles.walletSubTitleTxt}>
                  Generate a new wallet
                </Text>
              </View>
              <Ionicons
                name={'chevron-forward'}
                size={25}
                color={colors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  caroselContainer: {
    marginTop: 25,
  },
  walletContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  walletSubContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  txtContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  headerTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 15,
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: '#333333',
    textAlign: 'center',
  },
  subTitleTxt: {
    fontSize: 16,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'center',
  },
  walletTitleTxt: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333333',
  },
  walletSubTitleTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  carouselContainer: {
    justifyContent: 'center',
  },
  imageView: {
    height: 250,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  pageDotView: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 15,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 100,
    marginHorizontal: 6,
    backgroundColor: '#D9D9D9',
  },
  activeDot: {
    height: 10,
    width: 18,
    borderRadius: 50,
    backgroundColor: '#ED1C24',
  },
});

export default WalletTypeComponent;
