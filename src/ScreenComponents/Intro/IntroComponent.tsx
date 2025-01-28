/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {colors} from '../../utils/colors';
import Carousel from 'react-native-reanimated-carousel';
import {useAppDispatch} from '../../store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {authAction} from '../../reducer/auth/authSlice';
import _ from 'lodash';
import Intro1 from '../../assets/intro1.svg';
import Intro2 from '../../assets/intro2.svg';
import appStyles, {fontFamily} from '../../utils/appStyles';
import LinearGradient from 'react-native-linear-gradient';
import {useRegisterMutation} from '../../api/auth/authAPI';
import useCommon from '../../hooks/useCommon';
import {getErrorMessage} from '../../utils/common';
import {getBaseOs, getDeviceId, getUniqueId} from 'react-native-device-info';
import {axiosAPI} from '../../axios/axiosAPI';

type Props = NativeStackScreenProps<any, 'INTRO'>;

type PaginateProp = {
  count: number;
  active: number;
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  carouselContainer: {
    height: height / 1.8,
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 28,
    color: '#231F20',
    fontWeight: 700,
    fontFamily: fontFamily.inter_bold,
    textAlign: 'center',
  },
  subTitleTxt: {
    fontSize: 12,
    color: '#7C8FAC',
    fontWeight: 400,
    fontFamily: fontFamily.inter_regular,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 60,
  },
  imageView: {
    flex: 1.8,
  },
  pageDotView: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
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
    borderColor: '#ED1C24',
    borderWidth: 0.5,
    marginHorizontal: 6,
  },
  activeDotUpper: {
    height: 15,
    width: 15,
    borderRadius: 100,
    borderColor: 'rgba(237, 28, 36, 0.40)',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  activeDotLower: {
    height: 7,
    width: 7,
    borderRadius: 100,
    backgroundColor: '#ED1C24',
  },
  startedTouch: {
    width: '100%',
    marginTop: height / 9,
  },
  startedBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 100,
    width: '85%',
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: fontFamily.inter_semi_bold,
    paddingTop: 15,
    paddingBottom: 15,
  },
  touchOpacity: {
    opacity: 0.5,
  },
});

const slideContent: any = [
  {
    img: <Intro1 width={350} height={350} style={styles.imageContainer} />,
    title: 'Secure Your Assets Easily',
    subTitle:
      'Protect your assets with advanced encryption and stay in control of your secure crypto wallet.',
  },
  {
    img: <Intro2 width={350} height={350} style={styles.imageContainer} />,
    title: 'Simplified Your Crypto',
    subTitle:
      'Effortlessly manage and track your tokens with TGwallet, keeping your crypto organized and accessible anytime."',
  },
];

const PaginationDots = (props: PaginateProp) => {
  return (
    <View style={styles.dotContainer}>
      {_.map(new Array(props.count), (_val: any, index: any) => (
        <>
          {index + 1 === props.active ? (
            <View style={styles.activeDotUpper}>
              <View style={styles.activeDotLower} />
            </View>
          ) : (
            <View key={index + 1} style={styles.dot} />
          )}
        </>
      ))}
    </View>
  );
};

const IntroComponent = ({}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const [activeDot, setActiveDot] = useState(1);
  const [deviceID, setDeviceID] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const dispatch = useAppDispatch();

  const [register, {isLoading}] = useRegisterMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  useEffect(() => {
    getUniqueId().then(uniqueId => {
      setDeviceID(uniqueId);
    });
    getBaseOs().then(baseOs => {
      setDeviceName(baseOs);
    });
  }, []);

  const registerSubmit = async () => {
    try {
      const payload = {
        platform: 'Android',
        device_id: deviceID,
      };

      const response: any = await register(payload);
      if (response?.data?.success) {
        dispatch(authAction.setFinishStarted(true));
        dispatch(authAction.setLogin(response?.data?.userinfo));
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
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={styles.container}>
          <View style={{height: height / 1.5}}>
            <Carousel
              width={width - 20}
              loop={false}
              data={slideContent}
              scrollAnimationDuration={1000}
              onProgressChange={(_, absoluteProgress) => {
                setActiveDot(Math.round(absoluteProgress) + 1);
              }}
              renderItem={({index}) => (
                <View style={styles.carouselContainer}>
                  <View style={styles.imageView}>
                    {slideContent[index].img}
                  </View>
                  <Text style={styles.titleTxt}>
                    {slideContent[index].title}
                  </Text>
                  <Text style={styles.subTitleTxt}>
                    {slideContent[index].subTitle}
                  </Text>
                </View>
              )}
            />
            <PaginationDots count={2} active={activeDot} />
          </View>
          <TouchableOpacity
            style={[
              styles.startedTouch,
              activeDot === 1 && styles.touchOpacity,
            ]}
            onPress={() => {
              registerSubmit();
            }}
            disabled={activeDot === 1}>
            <LinearGradient
              colors={['#6B121C', '#ED1C24']}
              style={styles.startedBtn}>
              <Text style={styles.startedBtnTxt}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default IntroComponent;
