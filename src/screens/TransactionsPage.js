import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, StatusBar,FlatList} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import {navigate} from '../helpers/navigasi'
import {clear_data, set_transactions_list, get_data_transaksi} from '../redux/actions/transactionsActions'

import {Header} from '../components'

export default function TransactionsPage(props){
    const dispatch = useDispatch()
    const {transactionsList} = useSelector(state => state.transactionsReducer)

    useEffect(()=>{
        console.log(transactionsList,'======')
        dispatch(get_data_transaksi())
        .then(res =>{
            let data = Object.values(res)
            dispatch(set_transactions_list(data))
            // console.log('res====', res, '=====', data)
            setTimeout(() => {
                console.log(transactionsList,'======')
            }, 500);
        })
    },[])



    return(
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Header title='Transaction List' back/>
            {
                transactionsList.length > 0 &&
                <FlatList
                    style={{flex: 1, top : 0}}
                    data={transactionsList}
                    renderItem={({item, index})=>{
                        return(
                            <View style={{padding: 5}}>
                                <Text>{item.beneficiary_name}</Text>
                            </View>
                        )
                    }}
                />
            }
            <Text onPress={()=>navigate('TransactionDetail')}>Menuju Transaction Detail</Text>
        </View>
    )
}