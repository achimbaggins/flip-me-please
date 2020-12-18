import React, {useState, useCallback} from 'react'
import {View, Text, StatusBar,} from 'react-native'

export default function TransactionsPage(props){
    const {navigation} = props
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text onPress={()=>navigation.navigate('TransactionDetail')}>Menuju Transaction Detail</Text>
        </View>
    )
}