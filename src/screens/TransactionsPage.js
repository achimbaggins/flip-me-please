import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, StatusBar,} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import {navigate} from '../helpers/navigasi'
import {clear_data, set_transactions_list, get_data_transaksi} from '../redux/actions/transactionsActions'

export default function TransactionsPage(props){
    const dispatch = useDispatch()
    const {transactionsReducer} = useSelector(state => state)

    useEffect(()=>{
        console.log(transactionsReducer,'======')
        dispatch(get_data_transaksi())
        .then(res =>{
            console.log('res====', res)
        })
    },[])

    return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text onPress={()=>navigate('TransactionDetail')}>Menuju Transaction Detail</Text>
        </View>
    )
}