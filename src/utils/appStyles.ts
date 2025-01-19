import {Platform, StyleSheet} from 'react-native';
import {colors} from './colors';

export const fontFamily = {
  inter_thin: 'InterThin', //100
  inter_extra_light: 'InterExtraLight',//200
  inter_light: 'InterLight',//300
  inter_regular: 'InterRegular',//400
  inter_medium: 'InterMedium',//500
  inter_semi_bold: 'InterSemiBold',//600
  inter_bold: 'InterBold',//700
  inter_extra_bold: 'InterExtraBold',//800
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    marginTop: 10,
  },
  titleTxt: {
    fontSize: 20,
    color: colors.inputBorder,
    fontFamily: fontFamily.inter_bold,
  },
  boxShadow: {
    shadowColor: colors.arrowShadow,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        elevation: 10,
        shadowOffset: {width: 0, height: -10},
      },
    }),
  },
});

export default appStyles;
