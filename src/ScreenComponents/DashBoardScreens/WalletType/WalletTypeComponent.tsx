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
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<any, 'WALLET_TYPE'>;

type PaginateProp = {
  count: number;
  active: number;
};

const {width} = Dimensions.get('window');

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
  const {t} = useTranslation();
  const {toggleBackdrop} = useCommon();
  const [activeDot, setActiveDot] = useState(1);

  const slideContent: any = [
    {
      title: t('WALLET_TYPE_TITLE_1'),
      subTitle: t('WALLET_TYPE_SUBTITLE_1'),
      icon: <Wallet1 />,
    },
    {
      title: t('WALLET_TYPE_TITLE_2'),
      subTitle: t('WALLET_TYPE_SUBTITLE_2'),
      icon: <Wallet2 />,
    },
  ];

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
      <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={appStyles.scrollContainer}>
          <View style={styles.caroselContainer}>
            <Carousel
              width={width}
              height={verticalScale(400)}
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
            <Text style={styles.headerTxt}>{t('I_HAVE_MY_OWN_WALLET')}</Text>
            <TouchableOpacity
              style={[appStyles.boxShadow, styles.walletSubContainer]}
              onPress={() =>
                navigation.navigate('SELECT_NETWORK', {
                  fromImport: true,
                })
              }>
              <ImportWallet width={scale(40)} height={scale(40)} />
              <View style={styles.txtContainer}>
                <Text style={styles.walletTitleTxt}>{t('IMPORT_EXISTING_WALLET')}</Text>
                <Text style={styles.walletSubTitleTxt}>{t('IMPORT_WALLET_DESC')}</Text>
              </View>
              <Ionicons
                name={'chevron-forward'}
                size={scale(15)}
                color={colors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTxt}>{t('I_NEED_A_NEW_WALLET')}</Text>
            <TouchableOpacity
              style={[appStyles.boxShadow, styles.walletSubContainer]}
              onPress={() => navigation.navigate('SELECT_NETWORK')}>
              <CreateWallet width={scale(40)} height={scale(40)} />
              <View style={styles.txtContainer}>
                <Text style={styles.walletTitleTxt}>{t('CREATE_NEW_WALLET')}</Text>
                <Text style={styles.walletSubTitleTxt}>{t('CREATE_WALLET_DESC')}</Text>
              </View>
              <Ionicons
                name={'chevron-forward'}
                size={scale(15)}
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
    fontSize: moderateScale(13),
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 15,
  },
  titleTxt: {
    fontSize: moderateScale(26),
    fontWeight: 700,
    color: '#333333',
    textAlign: 'center',
  },
  subTitleTxt: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: '#7C8FAC',
    textAlign: 'center',
  },
  walletTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 600,
    color: '#333333',
  },
  walletSubTitleTxt: {
    fontSize: moderateScale(12),
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
