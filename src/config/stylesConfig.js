import { Dimensions } from 'react-native'
import {moderateScale} from '../helpers/scaling'

export const WHITE = '#ffffff' 
export const GREEN = '#53b785' 
export const GREEN_LOW = '#def5ed' 
export const ORANGE = '#ef6c3d' 
export const GREY = '#adadad' 
export const BLACK = '#212121' 

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

export const ITEMS_CENTER = {
    justifyContent: 'center',
    alignItems: 'center',
}
export const ITEMS_CENTER_END = {
    justifyContent: 'center',
    alignItems: 'flex-end',
}
export const ITEMS_START = {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
}
export const ITEMS_END = {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
}

export const FontStyle = (size, color, weight, family) => ({
    fontSize: size ? moderateScale(size) : moderateScale(12),
    color: color ? color : BLACK,
    fontWeight: weight ? weight : 'normal',
})