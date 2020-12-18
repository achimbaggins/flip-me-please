import React, {useState, useCallback} from 'react'
import {View, Text, StatusBar,} from 'react-native'

export default function TransactionDetail(props){
    const {route, navigation} = props
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text onPress={()=>navigation.goBack()}>Transaction Detail</Text>
        </View>
    )
}