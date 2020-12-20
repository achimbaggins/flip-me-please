import React, { memo } from 'react'
import { Platform } from 'react-native'
import { View, Text, StatusBar, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {WHITE, GREEN, SCREEN_WIDTH, ITEMS_CENTER_END, FontStyle, BLACK} from '../config/stylesConfig'
import {isIphoneX} from '../helpers/checkIPhoneX'
import { backNavigate } from '../helpers/navigasi'

const styles = {
    container: {
        paddingHorizontal: 15, 
        paddingBottom: 8, height: 
        Platform.OS === 'ios' && isIphoneX() ? 95 : 65, 
        backgroundColor: WHITE, width: SCREEN_WIDTH, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
}

const Header = memo(props => {
    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{
                    props.back ? backNavigate() : null
                }} style={{width: 50,}}>
                    {
                        props.back &&
                        <Icon name='arrow-back-ios' size={20} color={BLACK}/>
                    }
                </TouchableOpacity>
                {
                    props.title &&
                    <Text style={FontStyle(16, BLACK, 'bold')}>{props.title}</Text>
                }
                <View style={{width: 50,}}/>
            </View>
        </>
    )
})

export default Header