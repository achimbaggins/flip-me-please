import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, TextInput,FlatList,TouchableOpacity} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {navigate} from '../helpers/navigasi'
import {clear_data, set_transactions_list, get_data_transaksi} from '../redux/actions/transactionsActions'

import {Header} from '../components'
import { FontStyle, GREEN_LOW, GREY, ITEMS_CENTER, ORANGE, SCREEN_WIDTH, WHITE } from '../config/stylesConfig'

export default function TransactionsPage(props){
    const dispatch = useDispatch()
    const {transactionsList} = useSelector(state => state.transactionsReducer)
    const [keyword, setKeyword] = useState('')

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

    const _onChangeText = v => {
        setKeyword(v)
    }

    return(
        <View style={{flex: 1,}}>
            <Header title='Transaction List' back/>
            <View style={{backgroundColor: GREEN_LOW, flex: 1,}}>
                <View style={{width: SCREEN_WIDTH-20, margin: 10, borderRadius: 6, height: 50, backgroundColor: WHITE, paddingHorizontal: 10, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name='search' size={22} color={GREY}/>
                        <TextInput value={keyword} onChangeText={_onChangeText} placeholder='Cari nama, bank atau nominal' style={{flex: 1}}/>
                        {keyword.length > 0 && <Icon name='close' size={18} color={GREY} onPress={() => _onChangeText('')} />}
                    </View>
                    <View style={{width: 20,}}/>
                    <TouchableOpacity style={{flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={FontStyle(12, ORANGE)}>URUTKAN</Text>
                        <Icon name='expand-more' size={22} color={ORANGE}/>
                    </TouchableOpacity>
                </View>
                {
                    transactionsList.length > 0 &&
                    <FlatList
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
        </View>
    )
}