import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {colors} from '../utils/colors';
import {Ionicons} from '../utils/IconUtils';

interface PropsType {
  link: string;
  onClosePress: () => void;
  title?: string;
  visible: boolean;
  leftIcon?: boolean;
  rightIcon?: boolean;
  height?: any;
  showLocalImage?: boolean;
}

const DEFAULT_HEIGHT = 300;

const useAnimatedBottom = (show: boolean, height: number = DEFAULT_HEIGHT) => {
  const animatedValue = useRef(new Animated.Value(0));

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 100,
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 100,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return bottom;
};

const AppWebviewComponent = (props: PropsType) => {
  const {link, onClosePress, visible} = props;

  const bottom = useAnimatedBottom(visible);

  return (
    visible && (
      <Animated.View style={[{bottom}, styles.topView]}>
        <View style={styles.titleView}>
          <TouchableOpacity style={styles.rightIcon} onPress={onClosePress}>
            <Ionicons name={'close'} size={25} color={colors.black} />
          </TouchableOpacity>
        </View>

        <WebView
          source={{uri: link}}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          cacheEnabled={false}
          startInLoadingState={true}
        />
      </Animated.View>
    )
  );
};
const styles = StyleSheet.create({
  leftIcon: {
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rightIcon: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleView: {
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  topView: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.background,
    position: 'absolute',
  },
});

export default AppWebviewComponent;
