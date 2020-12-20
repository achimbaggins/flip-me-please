import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 680;

const scale = size => Math.round(width / guidelineBaseWidth * size);
const verticalScale = size => Math.round(height / guidelineBaseHeight * size) ;
const moderateScale = (size, factor = 1) => Math.round(size + ( scale(size) - size ) * factor);
const moderateVScale = (size, factor = 1) => Math.round(size + ( verticalScale(size) - size ) * factor);

export {scale, verticalScale, moderateScale, moderateVScale};
