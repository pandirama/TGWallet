import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../../utils/appStyles';
import {colors} from '../../../../utils/colors';
import Loading from '../../../../assets/loading.svg';
import { Ionicons } from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'NUMBER_DISPLAY'>;

const NumberDisplayComponent = ({navigation}: Props) => {
  const [selectedNumber, setSelectedNumber] = useState(false);

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

          <Text style={styles.headerTxt}>Number Display</Text>
        </View>
        <Text style={styles.historyTxt}>Big number shown on history:</Text>
        <TouchableOpacity
          style={[appStyles.boxShadow, styles.walletSubContainer]}
          onPress={() => setSelectedNumber(true)}>
          <View style={styles.walletTouch}>
            <Loading style={styles.loadIcon} />
            <Text style={styles.rightTxt}>+1234.12</Text>
          </View>
          <View style={styles.walletTouch}>
            <Loading style={styles.loadIcon} />
            <Text style={styles.rightTxt}>+1234567.12</Text>
          </View>
          <View style={styles.walletTouch}>
            <Loading style={styles.loadIcon} />
            <Text style={styles.rightTxt}>+1234567890.12</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[appStyles.boxShadow, styles.walletSubContainer]}>
          <View style={styles.walletTouch}>
            <Loading style={styles.loadIcon} />
            <Text style={styles.rightTxt}>+1.234M</Text>
          </View>
          <View style={styles.walletTouch}>
            <Loading style={styles.loadIcon} />
            <Text style={styles.rightTxt}>+1.234B</Text>
          </View>
          <View style={styles.walletTouch}>
            <Loading style={styles.loadIcon} />
            <Text style={styles.rightTxt}>+1.234T</Text>
          </View>
        </TouchableOpacity>
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
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  rightTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    flex: 1,
    textAlign: 'right',
    marginRight: 30,
  },
  loadIcon: {
    marginLeft: 25,
  },
  historyTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginLeft: 25,
    marginTop: 20,
  },
});

export default NumberDisplayComponent;
