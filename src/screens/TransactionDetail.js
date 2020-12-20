import React, {useState} from 'react'
import {View, Text, StatusBar,} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {backNavigate} from '../helpers/navigasi'
import {Header} from '../components'
import {GREEN_LOW, FontStyle, BLACK, WHITE, GREY, ORANGE} from '../config/stylesConfig'
import thousandSeparator from '../helpers/thousandSeparator'
import timeFormat from '../helpers/timeFormat'

export default function TransactionDetail(props){
    const {item} = props.navigation.state.params
    const {id, account_number, unique_code, amount, beneficiary_bank, remark, beneficiary_name,  sender_bank, status, completed_at, created_at} = item
    console.log(item)
    const [detail, setDetail] = useState(false)

    return(
        <View style={{flex: 1, backgroundColor: GREEN_LOW,}}>
            <Header title='Transaction Detail' back/>
            <View style={{padding: 20, backgroundColor: WHITE}}>
                <View style={{flexDirection:'row', paddingVertical: 25, borderBottomWidth: 0.5, borderBottomColor: GREY}}>
                    <Text selectable style={FontStyle(14, BLACK, '')}>ID TRANSAKSI: #{id}</Text>
                    <Icon name='content-copy' size={16} color={ORANGE} style={{marginHorizontal: 5}} onPress={()=>null}/>
                </View>
                <View style={{flexDirection:'row', paddingVertical: 25, borderBottomWidth: 0.5, borderBottomColor: GREY, justifyContent: 'space-between'}}>
                    <Text style={FontStyle(14, BLACK, '')}>DETAIL TRANSAKSI</Text>
                    <Text onPress={()=>setDetail(!detail)} style={FontStyle(14, ORANGE, '')}>{detail ? 'TUTUP' : 'LIHAT'}</Text>
                </View>
                {
                    detail &&
                    <>
                        <View style={{flexDirection:'row', marginVertical: 20}}>
                            <Text style={FontStyle(14, BLACK, 'bold')}>{sender_bank.toUpperCase()}</Text>
                            <Icon name='forward' style={{marginHorizontal: 5, marginBottom: -10}} size={20}/>
                            <Text style={FontStyle(14, BLACK, 'bold')}>{beneficiary_bank.toUpperCase()}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginVertical: 5}}>
                            <Text style={[FontStyle(12, BLACK, 'bold'),{flex: 2}]}>{beneficiary_name}</Text>
                            <Text style={[FontStyle(12, BLACK, 'bold'),{flex: 1}]}>Nominal</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom: 25}}>
                            <Text style={[FontStyle(12, BLACK, ''),{flex: 2}]}>{account_number}</Text>
                            <Text style={[FontStyle(12, BLACK, ''),{flex: 1}]}>{thousandSeparator(amount)}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginVertical: 5}}>
                            <Text style={[FontStyle(12, BLACK, 'bold'),{flex: 2}]}>BERITA TRANSFER</Text>
                            <Text style={[FontStyle(12, BLACK, 'bold'),{flex: 1}]}>KODE UNIK</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom: 25}}>
                            <Text style={[FontStyle(12, BLACK, ''),{flex: 2}]}>{remark}</Text>
                            <Text style={[FontStyle(12, BLACK, ''),{flex: 1}]}>{unique_code}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginVertical: 5}}>
                            <Text style={[FontStyle(12, BLACK, 'bold'),{flex: 2}]}>WAKTU DIBUAT</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom: 25}}>
                            <Text style={[FontStyle(12, BLACK, ''),{flex: 2}]}>{timeFormat(created_at)}</Text>
                        </View>
                    </>
                }
            </View>
        </View>
    )
}