/* eslint-disable react-hooks/exhaustive-deps */
import {moderateScale} from 'react-native-size-matters';
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
import {getErrorMessage} from '../../../../utils/common';
import {authAction} from '../../../../reducer/auth/authSlice';
import {useAppDispatch} from '../../../../store';
import useCommon from '../../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useLanguageListMutation,
  useUpdateLanguageMutation,
} from '../../../../api/profileAPI';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<any, 'LANGUAGE'>;

const LanguageComponent = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [languageLists, setLanguageLists] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState<any>({});

  const [basisList, {isLoading}] = useLanguageListMutation();
  const [updateLanguage] = useUpdateLanguageMutation();

  const {userInfo = {}, selectedLang = {}} = useSelector(
    ({authReducer}: any) => authReducer,
  );

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getBasisList = async () => {
    try {
      const response: any = await basisList().unwrap();
      if (response?.status) {
        setLanguageLists(response?.data);
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

  const updateLanguages = async () => {
    try {
      // If selectedLanguage is an empty object, use selectedLang instead
      const isSelectedLanguageEmpty =
        selectedLanguage &&
        Object.keys(selectedLanguage).length === 0 &&
        selectedLanguage.constructor === Object;
      const langObj = isSelectedLanguageEmpty ? selectedLang : selectedLanguage;
      const params = {
        userid: userInfo?.generated_Id,
        id: langObj?.id,
      };
      const response: any = await updateLanguage(params).unwrap();
      if (response?.status) {
        dispatch(authAction.setSelectedLangCode(langObj?.lang_symbol));
        dispatch(authAction.setSelectedLang(langObj));
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
          setSelectedLanguage(item);
        }}>
        <Text style={styles.titleTxt}>{item?.lang_name}</Text>
        {(selectedLanguage?.id ?? selectedLang?.id) === item?.id && (
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
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerLeftIcon}>
            <Ionicons name={'chevron-back'} size={25} color={'#333333'} />
          </TouchableOpacity>

          <Text style={styles.headerTxt}>{t('LANGUAGE')}</Text>
          <TouchableOpacity
            onPress={() => {
              updateLanguages();
            }}>
            <Text style={styles.headerRightTxt}>{t('SAVE')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={languageLists}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={styles.borderView} />;
          }}
          contentContainerStyle={[
            appStyles.boxShadow,
            styles.walletSubContainer,
          ]}
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
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
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
});

export default LanguageComponent;
