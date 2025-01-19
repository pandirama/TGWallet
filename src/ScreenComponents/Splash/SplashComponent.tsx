import React from 'react';
import {StatusBar} from 'react-native';
import Splash from '../../assets/splash_screen.svg';

const SplashComponent = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
        animated
      />
      <Splash width={'100%'} height={'100%'} />
    </>
  );
};

export default SplashComponent;
