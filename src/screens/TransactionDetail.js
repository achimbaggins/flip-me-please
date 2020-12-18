import React, {useState, useCallback} from 'react'
import {View, Text, StatusBar,} from 'react-native'
import {backNavigate} from '../helpers/navigasi'

export default function TransactionDetail(props){
    const {route, navigation} = props
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text onPress={()=>backNavigate()}>Transaction Detail</Text>
        </View>
    )
}