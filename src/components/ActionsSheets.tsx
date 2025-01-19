import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { Ionicons } from '../utils/IconUtils';

export const ActionSheetTitle = ({titleTxt, actionSheetRef}: any) => {
  return (
    <View style={styles.actionViewContainer}>
      <View style={styles.actionTitleView}>
        <Text style={styles.actionTitleTxt}>{titleTxt}</Text>
        <TouchableOpacity
          onPress={() => {
            actionSheetRef?.current?.hide();
          }}>
          <Ionicons name={'close'} size={20} color={'#333333'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ActionsSheets = ({children, titleTxt, actionSheetRef}: any) => {
  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.actionContainer}
      closeOnPressBack={false}
      closeOnTouchBackdrop={false}
      onClose={() => {
        actionSheetRef?.current?.hide();
      }}>
      {titleTxt && (
        <ActionSheetTitle titleTxt={titleTxt} actionSheetRef={actionSheetRef} />
      )}
      {children}
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  actionViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 25,
    paddingBottom: 30,
    backgroundColor: '#EFF2F5',
  },
  actionTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitleTxt: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 600,
  },
});

export default ActionsSheets;
