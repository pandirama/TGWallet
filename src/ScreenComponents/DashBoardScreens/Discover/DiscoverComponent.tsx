import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';

type Props = NativeStackScreenProps<any, 'DISCOVER'>;

const DiscoverComponent = ({}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}></SafeAreaView>
    </>
  );
};

export default DiscoverComponent;
