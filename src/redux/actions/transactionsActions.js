import axios from 'axios'
import config from '../../config'
import constants from '../_reduxConstants'

export const set_transactions_list = data => ({
    type: constants.SET_TRANSACTIONS,
    payload: data
})

export const clear_data = () => ({
    type: constants.CLEAR_DATA,
})

export const get_data_transaksi = () => {
    return async () => {
        try {
            let url = `${config.URL}/frontend-test`
            const res = await axios.get(url,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return res.data
        } catch (err) {
            if(err.response) return err.response.data
            else return err
        }
    }
}