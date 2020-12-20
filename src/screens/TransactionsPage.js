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
    const [searchList, setSearchList] = useState([])

    useEffect(()=>{
        dispatch(get_data_transaksi())
        .then(res =>{
            let data = Object.values(res)
            dispatch(set_transactions_list(data))
            console.log('res====', res, '=====', data)
            setTimeout(() => {
                console.log(transactionsList,'======')
            }, 500);
        })
    },[])

    const _onChangeText = v => {
        let normalize =  v.replace(/[^\w\s]/gi, '')
        let source = [...transactionsList]
        if(source.length > 0){
            setKeyword(normalize)
            let regex = new RegExp(normalize.toLowerCase(), 'g')
            let findAll = source.filter(item => item.beneficiary_name && item.beneficiary_name.toLowerCase().match(regex) || item.beneficiary_bank && item.beneficiary_bank.toLowerCase().match(regex) || item.sender_bank && item.sender_bank.toLowerCase().match(regex) ||   item.amount && item.amount.toString().slice(0,normalize.length) == normalize )
            console.log('hasil cari ===', findAll, regex)
            setSearchList(findAll)
        }
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
                    searchList.length > 0 ?
                    <FlatList
                        data={searchList}
                        renderItem={({item, index})=>{
                            return(
                                <View style={{padding: 5}}>
                                    <Text>{item.beneficiary_name}</Text>
                                </View>
                            )
                        }}
                    />
                    : transactionsList.length > 0 ?
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
                    : null
                }
                <Text onPress={()=>navigate('TransactionDetail')}>Menuju Transaction Detail</Text>
            </View>
        </View>
    )
}