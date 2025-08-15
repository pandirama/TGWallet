import { moderateScale } from 'react-native-size-matters';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
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
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import {Ionicons} from '../../../../utils/IconUtils';
import {
  useBasisListMutation,
  useUpdateTimeZoneMutation,
} from '../../../../api/profileAPI';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../../hooks/useCommon';
import {getErrorMessage} from '../../../../utils/common';
import {useSelector} from 'react-redux';
import {authAction} from '../../../../reducer/auth/authSlice';
import {useAppDispatch} from '../../../../store';

type Props = NativeStackScreenProps<any, 'CHANGE_BASIS'>;

const ChangeBasisComponents = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [basisLists, setBasisLists] = useState(null);
  const [selectedTime, setSelectedTime] = useState<any>({});

  const [basisList, {isLoading}] = useBasisListMutation();
  const [updateTimeZone, {isLoading: isTimeLoading}] =
    useUpdateTimeZoneMutation();

  const {userInfo = {}, timeZone = ''} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  useEffect(() => {
    toggleBackdrop(isLoading || isTimeLoading);
  }, [isLoading, isTimeLoading]);

  const getBasisList = async () => {
    try {
      const response: any = await basisList().unwrap();
      if (response?.status) {
        setBasisLists(response?.data);
        showToast({
          type: 'success',
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

  useFocusEffect(
    useCallback(() => {
      getBasisList();
      return () => {};
    }, []),
  );

  const updateTimeZones = async () => {
    try {
      const params = {
        userid: userInfo?.generated_Id,
        id: selectedTime?.id,
      };
      const response: any = await updateTimeZone(params).unwrap();
      if (response?.status) {
        dispatch(authAction.setTimeZone(selectedTime));
        showToast({
          type: 'success',
          text1: response?.message,
        });
        setTimeout(() => {
          navigation.goBack();
        }, 800);
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.walletTouch}
        onPress={() => {
          setSelectedTime(item);
        }}>
        <Text style={styles.titleTxt}>{item?.name}</Text>
        {(selectedTime?.id ?? timeZone?.id) === item?.id && (
          <Ionicons
            name={'checkmark'}
            size={20}
            color={'#0054A6'}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.white}
        animated
      />
      <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerLeftIcon}>
            <Ionicons name={'chevron-back'} size={25} color={'#333333'} />
          </TouchableOpacity>

          <Text style={styles.headerTxt}>Change Basis</Text>
          <TouchableOpacity
            onPress={() => {
              updateTimeZones();
            }}>
            <Text style={styles.headerRightTxt}>Save</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitleTxt}>Change Basis</Text>
        <Text style={styles.headerSubTitleTxt}>
          1. When you switch to a new UTC time zone, the price change(%) for
          token will be calculated based on your new time zone.
        </Text>
        <Text style={styles.headerSubTitleTxt}>
          2. Switching to a new UTC time zone will only effect the price change
          (%). This change will not apply to candlesticks.
        </Text>
        <FlatList
          data={basisLists}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={styles.borderView} />;
          }}
          style={styles.listContainer}
          contentContainerStyle={[
            appStyles.boxShadow,
            styles.walletSubContainer,
          ]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          keyExtractor={(item, index) => 'key' + index}
        />
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
    fontSize: moderateScale(18),
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
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',
    marginRight: 20,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  listContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    marginTop: 15,
    borderRadius: 10,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 15,
    flex: 1,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  headerTitleTxt: {
    fontSize: moderateScale(18),
    fontWeight: 600,
    color: '#333333',
    marginTop: 15,
    marginLeft: 25,
  },
  headerSubTitleTxt: {
    fontSize: moderateScale(14),
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 5,
    marginLeft: 25,
    marginRight: 20,
  },
});

export default ChangeBasisComponents;
