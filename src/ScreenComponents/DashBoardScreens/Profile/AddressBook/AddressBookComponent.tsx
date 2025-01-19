import React from 'react';
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
import DashBoardHeaderComponent from '../../../../components/DashBoardHeaderComponent';
import { Feather, Ionicons, SimpleLineIcons } from '../../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'ADDRESS_LIST'>;

const AddressBookComponent = ({}: Props) => {
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
          title={'Address Book'}
          rightIcon={
            <TouchableOpacity>
              <Feather
                name={'plus'}
                size={25}
                color={'#333333'}
                style={styles.icon}
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.netwokView}>
          <TouchableOpacity style={styles.allNetworkTxt}>
            <Text style={styles.modeTxt}>All Network</Text>
            <Ionicons name={'chevron-down'} size={18} color={'#333333'} />
          </TouchableOpacity>
        </View>
        <View style={styles.addressView}>
          <SimpleLineIcons name={'notebook'} size={50} color={'#7C8FAC'} />

          <Text style={styles.informationTxt}>
            You haven’t added address information yet
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  netwokView: {
    marginLeft: 15,
  },
  allNetworkTxt: {
    flexDirection: 'row',
  },
  modeTxt: {
    color: '#7C8FAC',
    fontSize: 12,
    fontWeight: 400,
  },
  informationTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
  },
  icon: {
    marginRight: 15,
    alignSelf: 'center',
  },
  addressView: {
    alignItems: 'center',
  },
});

export default AddressBookComponent;
