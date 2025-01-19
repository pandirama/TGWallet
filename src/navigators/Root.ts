/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {
  CommonActions,
  DrawerActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function isNavigateReady() {
  return navigationRef.current?.isReady();
}

export function navigate(name: string, params?: any) {
  isNavigateReady() && navigationRef.current?.navigate(name, params);
}

export function push(name: string, params?: any) {
  isNavigateReady() && navigationRef.dispatch(StackActions.push(name, params));
}

export function navigateAndReset(routes: any, index: number) {
  isNavigateReady() &&
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
}

export function navigateAndSimpleReset(name: string, index?: number) {
  isNavigateReady() &&
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: index || 0,
        routes: [{ name }],
      }),
    );
}

export function toggleDrawer() {
  isNavigateReady() &&
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
