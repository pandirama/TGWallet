/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../utils/colors';
import {Ionicons, MaterialIcons} from '../../../utils/IconUtils';
import Website from '../../../assets/profile/website.svg';
import Twitter from '../../../assets/profile/twitter.svg';
import Telegram from '../../../assets/profile/telegram.svg';
import FeedBack from '../../../assets/profile/feed_back.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import AppWebviewComponent from '../../../components/AppWebviewComponent';

const DescriptionComponent = ({descInfos}: any) => {
  const [url, setUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const onClosePress = () => {
    setVisible(false);
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#7C8FAC',
              fontWeight: 400,
              flex: 1,
            }}>
            Contract
          </Text>
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() => {
              Clipboard.setString(descInfos?.contract);
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#333333',
                fontWeight: 400,
                flex: 1,
              }}
              numberOfLines={1}>
              {descInfos?.contract}
            </Text>
            <Ionicons name={'copy-outline'} size={14} color={'#7C8FAC'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#7C8FAC',
              fontWeight: 400,
              flex: 1,
            }}>
            Total Supply
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#333333',
              fontWeight: 400,
              flex: 1,
            }}>
            {descInfos?.total_supply}
          </Text>
        </View>
        <View style={styles.borderView} />
        <Text
          style={{
            fontSize: 12,
            color: '#333333',
            fontWeight: 500,
            marginTop: 15,
          }}>
          Description
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#7C8FAC',
            fontWeight: 400,
            marginTop: 5,
          }}>
          As the native coin of the Binance Chain, BNB has multiple use cases:
          fueling transactions on the Chain, paying
        </Text>
        <View style={styles.borderView} />
        <Text
          style={{
            fontSize: 12,
            color: '#333333',
            fontWeight: 500,
            marginTop: 15,
          }}>
          Project Info
        </Text>
        {descInfos?.website && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EFF2F5',
              padding: 5,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Website width={30} height={30} />
            <Text
              style={{
                fontSize: 12,
                color: '#333333',
                fontWeight: 400,
                marginLeft: 5,
                flex: 0.5,
              }}>
              Website
            </Text>

            <TouchableOpacity
              onPress={() => {
                setUrl(descInfos?.website);
                setVisible(true);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#7C8FAC',
                  fontWeight: 400,
                  marginRight: 5,
                  flex: 1,
                  textAlign: 'right',
                }}
                numberOfLines={1}>
                {descInfos?.website}
              </Text>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                size={20}
                color={'#7C8FAC'}
              />
            </TouchableOpacity>
          </View>
        )}

        {descInfos?.twitter && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EFF2F5',
              padding: 5,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Twitter width={30} height={30} />
            <Text
              style={{
                fontSize: 12,
                color: '#333333',
                fontWeight: 400,
                marginLeft: 5,
                flex: 0.5,
              }}>
              Twitter
            </Text>

            <TouchableOpacity
              onPress={() => {
                setUrl(descInfos?.twitter);
                setVisible(true);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#7C8FAC',
                  fontWeight: 400,
                  marginRight: 5,
                  flex: 1,
                  textAlign: 'right',
                }}
                numberOfLines={1}>
                {descInfos?.twitter}
              </Text>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                size={20}
                color={'#7C8FAC'}
              />
            </TouchableOpacity>
          </View>
        )}

        {descInfos?.telegram && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EFF2F5',
              padding: 5,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Telegram width={30} height={30} />
            <Text
              style={{
                fontSize: 12,
                color: '#333333',
                fontWeight: 400,
                marginLeft: 5,
                flex: 0.5,
              }}>
              Telegram
            </Text>

            <TouchableOpacity
              onPress={() => {
                setUrl(descInfos?.telegram);
                setVisible(true);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#7C8FAC',
                  fontWeight: 400,
                  marginRight: 5,
                  flex: 1,
                  textAlign: 'right',
                }}>
                {descInfos?.telegram}
              </Text>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                size={20}
                color={'#7C8FAC'}
              />
            </TouchableOpacity>
          </View>
        )}

        {descInfos?.facebook && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EFF2F5',
              padding: 5,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <FeedBack width={30} height={30} />
            <Text
              style={{
                fontSize: 12,
                color: '#333333',
                fontWeight: 400,
                marginLeft: 5,
                flex: 0.5,
              }}>
              Facebook
            </Text>
            <TouchableOpacity
              onPress={() => {
                setUrl(descInfos?.facebook);
                setVisible(true);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#7C8FAC',
                  fontWeight: 400,
                  marginRight: 5,
                  flex: 1,
                  textAlign: 'right',
                }}>
                {descInfos?.facebook}
              </Text>
              <MaterialIcons
                name={'keyboard-arrow-right'}
                size={20}
                color={'#7C8FAC'}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <AppWebviewComponent
        visible={visible}
        onClosePress={onClosePress}
        link={url}
        rightIcon
      />
    </>
  );
};

const styles = StyleSheet.create({
  borderView: {
    borderWidth: 0.7,
    borderColor: colors.gray1,
    width: '100%',
    marginTop: 10,
  },
});

export default DescriptionComponent;
