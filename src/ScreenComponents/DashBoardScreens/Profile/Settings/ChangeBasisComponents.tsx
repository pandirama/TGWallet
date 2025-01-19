/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
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

type Props = NativeStackScreenProps<any, 'CHANGE_BASIS'>;

const languageList = [
  {
    id: 0,
    label: 'Last 24 hours (Device time zone)',
  },
  {
    id: 1,
    label: 'UTC+12, 00:00',
  },
  {
    id: 2,
    label: 'UTC+11, 00:00',
  },
  {
    id: 3,
    label: 'UTC+10, 00:00',
  },
  {
    id: 4,
    label: 'UTC+09, 00:00',
  },
  {
    id: 5,
    label: 'UTC+08, 00:00',
  },
  {
    id: 6,
    label: 'UTC+07, 00:00',
  },
  {
    id: 7,
    label: 'UTC+06, 00:00',
  },
  {
    id: 8,
    label: 'UTC+05, 00:00',
  },
  {
    id: 9,
    label: 'UTC+11, 00:00',
  },
  {
    id: 10,
    label: 'UTC+04, 00:00',
  },
  {
    id: 11,
    label: 'UTC+03, 00:00',
  },
  {
    id: 12,
    label: 'UTC+02, 00:00',
  },
  {
    id: 13,
    label: 'UTC+01, 00:00',
  },
  {
    id: 14,
    label: 'UTC-1, 00:00',
  },
];

const ChangeBasisComponents = ({navigation}: Props) => {
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

          <Text style={styles.headerTxt}>Change Basis</Text>
          <TouchableOpacity>
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
          data={languageList}
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
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: 600,
    color: '#333333',
    marginTop: 15,
    marginLeft: 25,
  },
  headerSubTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    marginTop: 5,
    marginLeft: 25,
    marginRight: 20,
  },
});

export default ChangeBasisComponents;
