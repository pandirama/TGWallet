/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Ionicons} from '../../../utils/IconUtils';
import CustomTabs from '../../../components/CustomTabs';
import {colors} from '../../../utils/colors';

const PoolsTabs = {
  PoolChanges: 'Pool Changes',
  LPDetails: 'LP Details',
};

const PoolsComponent = ({pools}: any) => {
  const [activeTab, setActiveTab] = useState(PoolsTabs.PoolChanges);

  const renderItem = ({item}: any) => {
    const isPlus = item?.amount < 0;
    return (
      <View style={styles.listTouch}>
        <Text style={[styles.listItemTxt]} numberOfLines={1}>
          {item?.time}
        </Text>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.listItemTxt,
              isPlus ? {color: '#D32F2F'} : {color: '#167E8D'},
              {marginRight: 5},
            ]}
            numberOfLines={1}>
            {item?.token0}
          </Text>
          <Text
            style={[styles.listItemTxt, {color: '#333333', marginRight: 5}]}
            numberOfLines={1}>
            {item?.token1}
          </Text>
        </View>

        <Text
          style={[styles.listItemTxt, {color: '#333333', marginRight: 5}]}
          numberOfLines={1}>
          {item?.value}
        </Text>
        <Text style={[styles.listItemTxt]} numberOfLines={1}>
          {item?.wallet}
        </Text>
      </View>
    );
  };

  const renderHolderItem = ({item}: any) => {
    return (
      <View style={styles.listTouch}>
        <Text style={[styles.listItemTxt]} numberOfLines={1}>
          {item?.time}
        </Text>
        <Text
          style={[styles.listItemTxt, {color: '#333333', marginRight: 5}]}
          numberOfLines={1}>
          {item?.value}
        </Text>
      </View>
    );
  };

  const headerComponent = () => {
    return (
      <>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#E0E0E0',
            padding: 8,
            borderRadius: 12,
            marginTop: 5,
          }}>
          <View
            style={{
              backgroundColor: '#FFF8E1',
              padding: 8,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#FFA000',
                flex: 1,
              }}>
              Displaying data for the largest pool by default. You can switch to
              different pools to view their respective data.
            </Text>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Ionicons name={'close-outline'} size={22} color={'#FFA000'} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#7C8FAC',
                flex: 1,
              }}>
              Pair
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#7C8FAC',
                flex: 1,
              }}>
              Amount
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#7C8FAC',
                flex: 1,
              }}>
              Value
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#7C8FAC',
                flex: 1,
              }}>
              Logo
            </Text>
          </View>
          {pools?.pooldisplay?.map((pool: any) => {
            return (
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#333',
                    flex: 1,
                  }}>
                  {pool?.pair}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#333',
                    flex: 1,
                  }}>
                  {pool?.amount}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: '#333',
                    flex: 1,
                  }}>
                  {pool?.value}
                </Text>
                <View style={{flex: 1}}>
                  <Image
                    style={styles.itemLogo}
                    source={{
                      uri: pool?.logo,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View style={{marginTop: 15, marginBottom: 10}}>
          <CustomTabs
            activeTab={activeTab}
            onSelectItem={(val: any) => setActiveTab(val)}
            titles={[PoolsTabs.PoolChanges, PoolsTabs.LPDetails]}
          />
        </View>
      </>
    );
  };

  return (
    <View>
      {activeTab === PoolsTabs.PoolChanges && (
        <FlatList
          data={pools?.transactions}
          renderItem={renderItem}
          removeClippedSubviews={false}
          scrollEnabled={false}
          keyExtractor={(item, index) => 'key' + index}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <View style={styles.borderView} />;
          }}
          ListHeaderComponent={
            <View>
              {headerComponent()}
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: '#03A9F4',
                      width: 8,
                      height: 8,
                      borderRadius: 100,
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#333',
                    }}>{`Liquidity: ${pools?.liquidity}`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#00C9A7',
                      width: 8,
                      height: 8,
                      borderRadius: 100,
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#333',
                    }}>{`24H Vol: ${pools?.volume_24h}`}</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomColor: '#E0E0E0',
                  paddingBottom: 10,
                  paddingTop: 15,
                }}>
                <Text style={[styles.listItemTitleTxt]}>Time</Text>
                <Text style={[styles.listItemTitleTxt]}>Amount</Text>
                <Text style={[styles.listItemTitleTxt]}>Value($)</Text>
                <Text style={[styles.listItemTitleTxt]}>Address</Text>
              </View>
            </View>
          }
        />
      )}
      {activeTab === PoolsTabs.LPDetails && (
        <View>
          <FlatList
            data={pools?.lp_holders}
            renderItem={renderHolderItem}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 345}}
            ItemSeparatorComponent={() => {
              return <View style={styles.borderView} />;
            }}
            ListHeaderComponent={
              <View>
                {headerComponent()}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#333',
                      flex: 1,
                    }}>
                    LP Holders
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#333',
                    }}>
                    {pools?.holderscount}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#333',
                      flex: 1,
                    }}>
                    Locked
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#0288D1',
                    }}>
                    0.00%
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                    paddingTop: 15,
                  }}>
                  <Text style={[styles.listItemTitleTxt]}>Holder(Top10)</Text>
                  <Text style={[styles.listItemTitleTxt]}>Amount(Ratio)</Text>
                </View>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemLogo: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    paddingLeft: 0,
    width: '100%',
  },
  listItemTitleTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    flex: 1,
    textAlign: 'left',
  },
  listItemTxt: {
    fontSize: 12,
    fontWeight: 400,
    color: '#7C8FAC',
    flex: 1,
    textAlign: 'left',
  },
  listTouch: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default PoolsComponent;
