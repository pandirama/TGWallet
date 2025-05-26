/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {colors} from '../../../utils/colors';

const CheckComponent = ({checkInfos}: any) => {
  const [checkInfo, setCheckInfo] = useState<any>([]);

  useEffect(() => {
    const dataArray = Object.keys(checkInfos).map(key => ({
      id: key,
      title: key,
      value: checkInfos[key],
    }));
    setCheckInfo(dataArray);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: colors.white, padding: 20, flex: 1}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#333333',
          }}>
          Security
        </Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <View
            style={{
              backgroundColor: '#EFF2F5',
              padding: 8,
              flex: 1,
              marginRight: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#333333',
              }}>
              ⚠️ Attention Count
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#333333',
                marginTop: 5,
              }}>
              {checkInfos?.['⚠️ Attention Count']}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#EFF2F5',
              padding: 8,
              flex: 1,
              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#333333',
              }}>
              ☠️ Danger Count
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#333333',
                marginTop: 5,
              }}>
              {checkInfos?.['☠️ Danger Count']}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#333333',
            marginTop: 10,
            marginBottom: 10,
          }}>
          {checkInfo?.[0]?.title}
        </Text>
        <View
          style={{
            backgroundColor: '#EFF2F5',
            padding: 15,
            borderRadius: 5,
          }}>
          {/* <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                padding: 8,
                borderRadius: 5,
                flex: 1,
                flexDirection: 'row',
                marginRight: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#7C8FAC',
                  flex: 1,
                }}>
                Buy Tax
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#167E8D',
                  flex: 1,
                  textAlign: 'right',
                }}>
                0.00%
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                padding: 8,
                flex: 1,
                borderRadius: 5,
                flexDirection: 'row',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#7C8FAC',
                  flex: 1,
                }}>
                Sell Tax
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#D32F2F',
                  flex: 1,
                  textAlign: 'right',
                }}>
                0.00%
              </Text>
            </View>
          </View> */}

          {checkInfo?.[0]?.value?.map((security: any) => {
            return (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333333',
                  marginTop: 5,
                }}>
                {security}
              </Text>
            );
          })}
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#333333',
            marginTop: 10,
          }}>
          {checkInfo?.[1]?.title}
        </Text>
        <View
          style={{
            backgroundColor: '#EFF2F5',
            padding: 15,
            borderRadius: 5,
            marginTop: 10,
          }}>
          {checkInfo?.[1]?.value?.map((security: any) => {
            return (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333333',
                  marginTop: 5,
                }}>
                {security}
              </Text>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckComponent;
