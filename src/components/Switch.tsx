/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

const Switch = (props: any) => {
  const {
    onValueChange,
    disabled,
    changeValueImmediately,
    value: propValue,
    backgroundActive,
    backgroundInactive,
    circleActiveColor,
    circleInActiveColor,
    activeText,
    inActiveText,
    circleSize,
    containerStyle,
    activeTextStyle,
    inactiveTextStyle,
    barHeight,
    circleBorderInactiveColor,
    circleBorderActiveColor,
    circleBorderWidth,
    innerCircleStyle,
    outerCircleStyle,
    renderActiveText,
    renderInActiveText,
    renderInsideCircle,
    switchWidthMultiplier,
    switchBorderRadius,
    ...restProps
  } = props;

  const [value, setValue] = useState(propValue);
  const transformSwitch = new Animated.Value(
    propValue
      ? circleSize / props.switchLeftPx
      : -circleSize / props.switchRightPx,
  );
  const backgroundColor = new Animated.Value(propValue ? 75 : -75);
  const circleColor = new Animated.Value(propValue ? 75 : -75);
  const circleBorderColor = new Animated.Value(propValue ? 75 : -75);

  useEffect(() => {
    if (props.value !== value) {
      animateSwitch(props.value, () => setValue(props.value));
    }
  }, [props.value]);

  const handleSwitch = useCallback(() => {
    if (disabled) {return;}
    const newValue = !value;

    if (changeValueImmediately) {
      animateSwitch(newValue);
      onValueChange(newValue);
    } else {
      animateSwitch(newValue, () => {
        setValue(newValue);
        onValueChange(newValue);
      });
    }
  }, [value, disabled, changeValueImmediately, onValueChange]);

  const animateSwitch = (newValue:any, cb = () => {}) => {
    Animated.parallel([
      Animated.spring(transformSwitch, {
        toValue: newValue
          ? circleSize / props.switchLeftPx
          : -circleSize / props.switchRightPx,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: newValue ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleColor, {
        toValue: newValue ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleBorderColor, {
        toValue: newValue ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(cb);
  };

  const interpolatedColorAnimation = backgroundColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [backgroundInactive, backgroundActive],
  });

  const interpolatedCircleColor = circleColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [circleInActiveColor, circleActiveColor],
  });

  const interpolatedCircleBorderColor = circleBorderColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [circleBorderInactiveColor, circleBorderActiveColor],
  });

  return (
    <TouchableWithoutFeedback onPress={handleSwitch} {...restProps}>
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          {
            backgroundColor: interpolatedColorAnimation,
            width: circleSize * switchWidthMultiplier,
            height: barHeight || circleSize,
            borderRadius: switchBorderRadius || circleSize,
          },
        ]}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              left: transformSwitch,
              width: circleSize * switchWidthMultiplier,
            },
            outerCircleStyle,
          ]}>
          {value && renderActiveText && (
            <Text style={[styles.text, styles.paddingRight, activeTextStyle]}>
              {activeText}
            </Text>
          )}

          <Animated.View
            style={[
              styles.circle,
              {
                borderWidth: circleBorderWidth,
                borderColor: interpolatedCircleBorderColor,
                backgroundColor: interpolatedCircleColor,
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
              },
              innerCircleStyle,
            ]}>
            {renderInsideCircle()}
          </Animated.View>
          {!value && renderInActiveText && (
            <Text style={[styles.text, styles.paddingLeft, inactiveTextStyle]}>
              {inActiveText}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

Switch.propTypes = {
  onValueChange: PropTypes.func,
  disabled: PropTypes.bool,
  activeText: PropTypes.string,
  inActiveText: PropTypes.string,
  backgroundActive: PropTypes.string,
  backgroundInactive: PropTypes.string,
  value: PropTypes.bool,
  circleActiveColor: PropTypes.string,
  circleInActiveColor: PropTypes.string,
  circleSize: PropTypes.number,
  circleBorderActiveColor: PropTypes.string,
  circleBorderInactiveColor: PropTypes.string,
  activeTextStyle: PropTypes.object,
  inactiveTextStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  barHeight: PropTypes.number,
  circleBorderWidth: PropTypes.number,
  innerCircleStyle: PropTypes.object,
  renderInsideCircle: PropTypes.func,
  changeValueImmediately: PropTypes.bool,
  outerCircleStyle: PropTypes.object,
  renderActiveText: PropTypes.bool,
  renderInActiveText: PropTypes.bool,
  switchLeftPx: PropTypes.number,
  switchRightPx: PropTypes.number,
  switchWidthMultiplier: PropTypes.number,
  switchBorderRadius: PropTypes.number,
};

Switch.defaultProps = {
  value: false,
  onValueChange: () => null,
  renderInsideCircle: () => null,
  disabled: false,
  activeText: 'On',
  inActiveText: 'Off',
  backgroundActive: 'green',
  backgroundInactive: 'gray',
  circleActiveColor: 'white',
  circleInActiveColor: 'white',
  circleBorderActiveColor: 'rgb(100, 100, 100)',
  circleBorderInactiveColor: 'rgb(80, 80, 80)',
  circleSize: 30,
  barHeight: null,
  circleBorderWidth: 1,
  changeValueImmediately: true,
  innerCircleStyle: {alignItems: 'center', justifyContent: 'center'},
  outerCircleStyle: {},
  renderActiveText: true,
  renderInActiveText: true,
  switchLeftPx: 2,
  switchRightPx: 2,
  switchWidthMultiplier: 2,
  switchBorderRadius: null,
  testID: null,
};

const styles = StyleSheet.create({
  container: {
    width: 71,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'black',
  },
  animatedContainer: {
    flex: 1,
    width: 78,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  paddingRight: {
    paddingRight: 5,
  },
  paddingLeft: {
    paddingLeft: 5,
  },
});

export default Switch;
