/* eslint-disable react/no-unstable-nested-components */
import React, { useState} from 'react';
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
import { Ionicons } from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'CURRENCY_UNIT'>;

const currencyUnitList = [
  {
    id: 0,
    label: 'USD',
  },
  {
    id: 1,
    label: 'United Arab Emirates Dirham(AED)',
  },
  {
    id: 2,
    label: 'Argentine Pesos($)',
  },
];

const CurrencyUnitComponent = ({navigation}: Props) => {
  const [selectedLanguage, setSelectedlanguage] = useState(null);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.walletTouch}
        onPress={() => setSelectedlanguage(item?.id)}>
        <Text style={styles.titleTxt}>{item?.label}</Text>
        {selectedLanguage === item?.id && (
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
      <SafeAreaView style={appStyles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerLeftIcon}>
            <Ionicons name={'chevron-back'} size={25} color={'#333333'} />
          </TouchableOpacity>

          <Text style={styles.headerTxt}>Currency Unit</Text>
          <TouchableOpacity>
            <Text style={styles.headerRightTxt}>Save</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={currencyUnitList}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={styles.borderView} />;
          }}
          contentContainerStyle={[
            appStyles.boxShadow,
            styles.walletSubContainer,
          ]}
          keyExtractor={(item: any) => item?.id}
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
  scrollHeaderView: {
    paddingBottom: 50,
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
  titleView: {
    flex: 1,
  },
  titleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    textAlignVertical: 'center',
    marginLeft: 15,
    flex: 1,
  },
  subTtitleTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    textAlignVertical: 'center',
    marginLeft: 15,
    marginTop: 5,
    marginRight: 50,
    flex: 1,
  },
  subTitleFlex: {
    flex: 0,
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

export default CurrencyUnitComponent;
