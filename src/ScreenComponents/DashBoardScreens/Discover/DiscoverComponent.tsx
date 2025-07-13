/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import WebView from 'react-native-webview';
import {Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'DISCOVER'>;

const DiscoverComponent = ({}: Props) => {
  const [url, setUrl] = useState('');
  const [urlName, setUrlName] = useState('https://pancakeswap.finance/');
  const [urlError, setUrlError] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const searchInput = useRef<TextInput | null>(null);

  console.log(isFocused);

  useEffect(() => {
    return () => {
      setShowWebView(false);
      setUrl('');
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.white,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <View style={styles.searchContainer}>
              <Ionicons name={'search'} size={20} color={colors.black} />
              <TextInput
                ref={input => {
                  searchInput.current = input;
                }}
                style={styles.input}
                placeholder="Enter Url"
                placeholderTextColor="#9C9DA0"
                value={urlName}
                onChangeText={text => {
                  setUrlName(text);
                  setUrlError(false);
                }}
                returnKeyType={'done'}
                onSubmitEditing={() => {
                  setUrl(urlName);
                  setShowWebView(true);
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {isFocused && (
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => {
                    setUrlName('');
                    setIsFocused(false);
                  }}>
                  <Ionicons
                    name={'close-circle-outline'}
                    size={20}
                    color={colors.black}
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                console.log(urlName);
                if (isFocused) {
                  setUrlName('');
                  setIsFocused(false);
                } else {
                  setUrl(urlName);
                  setShowWebView(true);
                }
                setUrl(urlName);
                setShowWebView(true);
              }}>
              <Text style={styles.headerRightTxt}>Submit</Text>
            </TouchableOpacity>
          </View>

          {urlError && <Text style={styles.errorTxt}>Enter Url</Text>}

          {showWebView && (
            <View style={{flex: 1, backgroundColor: 'red', marginTop: 15}}>
              <WebView
                source={{uri: url}}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                cacheEnabled={false}
                startInLoadingState={true}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topView: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  bottomView: {
    marginTop: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 50, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.gray1,
    flex: 1,
  },
  errorTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#F04438',
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    color: colors.black,
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: '#333333',
    marginBottom: 5,
  },
  subTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
    marginBottom: 25,
  },
  inputTitleTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#333333',
    marginBottom: 1,
    marginTop: 20,
    marginLeft: 5,
    lineHeight: 20,
  },
  startedTouch: {
    width: '100%',
    marginTop: 15,
  },
  startedBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '88%',
  },
  startedBtnTxt: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15,
  },
  readAgreeView: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  readAgreeTxt: {
    color: '#7C8FAC',
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 3,
  },
  agreeTxt: {
    color: '#ED1C24',
    fontSize: 14,
    fontWeight: 400,
  },
  touchOpacity: {
    opacity: 0.5,
  },
  headerRightTxt: {
    fontSize: 14,
    fontWeight: 400,
    color: '#7C8FAC',
  },
});

export default DiscoverComponent;
