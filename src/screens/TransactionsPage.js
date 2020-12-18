import React, {useState, useCallback} from 'react'
import {View, Text, StatusBar,} from 'react-native'
import {navigate} from '../helpers/navigasi'

export default function TransactionsPage(props){
    return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text onPress={()=>navigate('TransactionDetail')}>Menuju Transaction Detail</Text>
        </View>
    )
}