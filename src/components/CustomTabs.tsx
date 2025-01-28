import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';

export const WalletTabs = {
  RecoveryPhrase: 'Recovery Phrase',
  PrivateKey: 'Private Key',
};

export const RecoveryTabs = {
  HandwrittenBackup: 'Handwritten Backup',
  KeypalCardBackup: 'Keypal Card Backup',
};

const TabPill = ({
  title,
  isActive,
  onSelectItem,
}: {
  title: string;
  isActive?: boolean;
  onSelectItem: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onSelectItem}
      style={[styles.pillContainer, isActive && styles.activePill]}>
      <Text style={[styles.title, isActive && styles.activeTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

type Prop = {
  onSelectItem: (userType: string) => void;
  activeTab: string;
  titles: string[]
};

const CustomTabs = (props: Prop) => {
  const {activeTab, onSelectItem, titles} = props;
  return (
    <View style={styles.tabContainer}>
      {titles?.map((title: string) => {
        return (
          <TabPill
            title={title}
            isActive={activeTab === title}
            onSelectItem={() => onSelectItem(title)}
          />
        );
      })}
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#EFF2F5',
    borderRadius: 42,
    marginLeft: 10,
    width: '93%',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.29)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pillContainer: {
    alignItems: 'center',
    borderRadius: 42,
    paddingVertical: 9,
    paddingHorizontal: 8,
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    color: '#7C8FAC',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  activeTitle: {
    color: '#333333',
  },
  activePill: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
