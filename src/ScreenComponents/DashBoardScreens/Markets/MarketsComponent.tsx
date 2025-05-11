import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import CustomTabs, {MarketTabs} from '../../../components/CustomTabs';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';

type Props = NativeStackScreenProps<any, 'MARKETS'>;

const MarketsComponent = ({}: Props) => {
  const [activeTab, setActiveTab] = useState(MarketTabs.Market);

  const tabsView = () => {
    if (activeTab === MarketTabs.Market) {
      return <></>;
    }
    return <></>;
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'Market'} />
        <View style={styles.tabsView}>
          <CustomTabs
            activeTab={activeTab}
            onSelectItem={(val: any) => setActiveTab(val)}
            titles={[MarketTabs.SwapBridge, MarketTabs.Market]}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>{tabsView()}</View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  tabsView: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default MarketsComponent;
