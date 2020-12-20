import React, { memo } from 'react'
import { Platform } from 'react-native'
import { View, Text, StatusBar, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {WHITE, GREEN, SCREEN_WIDTH, ITEMS_CENTER_END, FontStyle, BLACK, ITEMS_CENTER, ORANGE} from '../config/stylesConfig'
import thousandSeparator from '../helpers/thousandSeparator'
import timeFormat from '../helpers/timeFormat'

const styles = {
    container: {
        borderRadius: 8,
        width: SCREEN_WIDTH-20,
        marginHorizontal: 10,
        marginVertical: 5,
        overflow: 'hidden',
        backgroundColor: WHITE,
        height: 120,
        flexDirection: 'row',
    },
    contentContainer: {
        padding: 20,
        flex: 1,
    },
}

const TransactionCard = memo(({account_number, amount, beneficiary_bank, beneficiary_name,  sender_bank, status, completed_at}) => {
    const statusSelector = {
        'SUCCESS' : {
            label: 'Berhasil',
            bg: GREEN,
            text: FontStyle(12, WHITE, ''),
            container: {backgroundColor: GREEN, borderRadius: 5, ...ITEMS_CENTER,  paddingHorizontal: 20, paddingVertical: 5,}
        },
        'PENDING' : {
            label: 'Pengecekan',
            bg: ORANGE,
            text: FontStyle(12, BLACK, ''),
            container: {backgroundColor: WHITE, borderWidth: 1, borderColor: ORANGE, borderRadius: 5, ...ITEMS_CENTER,  paddingHorizontal: 10}
        },
    }
    return(
        <>
            <View style={styles.container}>
                <View style={{height: '100%', width: 10, backgroundColor: statusSelector[status] ? statusSelector[status].bg : GREEN}}/>
                <View style={styles.contentContainer}>
                    <View style={{flexDirection:'row', marginVertical: 0}}>
                        <Text style={FontStyle(14, BLACK, 'bold')}>{sender_bank.toUpperCase()}</Text>
                        <Icon name='forward' style={{marginHorizontal: 5, marginBottom: -10}} size={20}/>
                        <Text style={FontStyle(14, BLACK, 'bold')}>{beneficiary_bank.toUpperCase()}</Text>
                    </View>
                    <View style={{flexDirection:'row', marginVertical: 5, justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={FontStyle(14, BLACK, '')}>{beneficiary_name}</Text>
                        <View style={statusSelector[status] ? statusSelector[status].container : {}}>
                            <Text style={statusSelector[status] ? statusSelector[status].text : FontStyle(12, BLACK, '')}>{statusSelector[status] ? statusSelector[status].label : status}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', marginVertical: 0}}>
                        <Text style={FontStyle(14, BLACK, '')}>Rp {thousandSeparator(amount)}</Text>
                        <Icon name='stop-circle' style={{marginHorizontal: 5, marginTop: 5}} size={10}/>
                        <Text style={FontStyle(14, BLACK, '')}>{timeFormat(completed_at)}</Text>
                    </View>
                </View>
            </View>
        </>
    )
})

export default TransactionCard