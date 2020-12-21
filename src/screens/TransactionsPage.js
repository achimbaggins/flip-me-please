import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, TextInput,FlatList,TouchableOpacity, Modal} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {navigate} from '../helpers/navigasi'
import {clear_data, set_transactions_list, get_data_transaksi} from '../redux/actions/transactionsActions'

import {Header, TransactionCard} from '../components'
import { BLACK_OPACITY_20, FontStyle, GREEN_LOW, GREY, ITEMS_CENTER, ORANGE, SCREEN_WIDTH, WHITE, BLACK } from '../config/stylesConfig'

export default function TransactionsPage(props){
    const dispatch = useDispatch()
    const {transactionsList} = useSelector(state => state.transactionsReducer)
    const [keyword, setKeyword] = useState('')
    const [searchList, setSearchList] = useState([])
    const [sortBy, setSortBy] = useState(false)
    const [selectSort, setSelectSort] = useState(false)

    const sortOption = [
        {name: 'Nama A-Z', kode: 'namaasc'},
        {name: 'Nama Z-A', kode: 'namadsc'},
        {name: 'Tanggal Terbaru', kode: 'terbaru'},
        {name: 'Tanggal Terlama', kode: 'terlama'},
    ]

    useEffect(()=>{
        getTransactions()
    },[])
    
    const getTransactions = useCallback(()=>{
        dispatch(get_data_transaksi())
        .then(res =>{
            let data = Object.values(res)
            dispatch(set_transactions_list(data))
            console.log('res====', res, '=====', data)
            setTimeout(() => {
                console.log(transactionsList,'======')
            }, 500);
        })
    })

    const _onChangeText = v => {
        let normalize =  v.replace(/[^\w\s]/gi, '')
        let source = [...transactionsList]
        if(source.length > 0){
            setKeyword(normalize)
            let regex = new RegExp(normalize.toLowerCase(), 'g')
            let findAll = source.filter(item => item.beneficiary_name && item.beneficiary_name.toLowerCase().match(regex) || item.beneficiary_bank && item.beneficiary_bank.toLowerCase().match(regex) || item.sender_bank && item.sender_bank.toLowerCase().match(regex) ||   item.amount && item.amount.toString().slice(0,normalize.length) == normalize )
            setSearchList(findAll)
        }
    }

    const _handleSort = code => {
        let newList = searchList.length > 0 ? [...searchList] : [...transactionsList]
        if(code === 'namaasc') newList.sort((a,b)=> a.beneficiary_name.localeCompare(b.beneficiary_name))
        if(code === 'namadsc') newList.sort((a,b)=> b.beneficiary_name.localeCompare(a.beneficiary_name))
        if(code === 'terbaru') newList.sort((a,b)=> (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime())
        if(code === 'terlama') newList.sort((a,b)=> (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime())
        searchList.length > 0 ? setSearchList(newList) : dispatch(set_transactions_list(newList))
    }

    return(
        <View style={{flex: 1,}}>
            <Header title='Transaction List'/>
            <View style={{backgroundColor: GREEN_LOW, flex: 1,}}>
                <View style={{width: SCREEN_WIDTH-20, margin: 10, borderRadius: 6, height: 50, backgroundColor: WHITE, paddingHorizontal: 10, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name='search' size={22} color={GREY}/>
                        <TextInput value={keyword} onChangeText={_onChangeText} placeholder='Cari nama, bank atau nominal' style={{flex: 1}}/>
                        {keyword.length > 0 && <Icon name='close' size={18} color={GREY} onPress={() => _onChangeText('')} />}
                    </View>
                    <View style={{width: 20,}}/>
                    <TouchableOpacity onPress={()=> setSelectSort(true)} style={{flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={FontStyle(12, ORANGE)}>{sortBy ? sortBy : 'URUTKAN'}</Text>
                        <Icon name='expand-more' size={22} color={ORANGE}/>
                    </TouchableOpacity>
                </View>
                {
                    searchList.length > 0 ?
                    <FlatList
                        data={searchList}
                        renderItem={({item, index})=>{
                            return(
                                <TouchableOpacity onPress={()=>navigate('TransactionDetail', {item})}>
                                    <TransactionCard {...item}/>
                                </TouchableOpacity>
                            )
                        }}
                        />
                        : searchList.length == 0 && keyword.length ?
                        <Text style={{textAlign:'center'}}>tidak dapat menemukan yang Anda cari.</Text>
                        : transactionsList.length > 0 ?
                        <FlatList
                        data={transactionsList}
                        renderItem={({item, index})=>{
                            return(
                                <TouchableOpacity onPress={()=>navigate('TransactionDetail', {item})}>
                                    <TransactionCard {...item}/>
                                </TouchableOpacity>
                            )
                        }}
                    /> 
                    : null
                }
                <View style={{height: 30}}/>
            </View>
            <Modal onRequestClose={()=>setSelectSort(false)} transparent visible={selectSort}>
                <View style={{flex: 1, backgroundColor: BLACK_OPACITY_20, ...ITEMS_CENTER}}>
                    <View style={{width: SCREEN_WIDTH-20, margin: 10, padding: 20, backgroundColor: WHITE, borderRadius: 10,}}>
                        {
                            sortOption.map((item, i)=>{
                                return(
                                    <TouchableOpacity key={i} onPress={()=>{
                                        setSelectSort(false)
                                        setSortBy(item.name)
                                        _handleSort(item.kode)
                                    }} style={{flexDirection: 'row', marginBottom: i == sortOption.length-1 ? 5 : 25, alignItems:'center'}}>
                                        <Icon name={sortBy == item.name ? 'radio-button-on' : 'radio-button-off' } color={ORANGE} size={20} style={{marginRight: 10,}}/>
                                        <Text style={FontStyle(12, BLACK)}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}