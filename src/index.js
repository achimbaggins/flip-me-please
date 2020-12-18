import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import {TransactionsPage, TransactionDetail} from './screens'

const AppNavigator = createAppContainer(createStackNavigator({
    TransactionsPage: { screen: TransactionsPage },
    TransactionDetail: { screen: TransactionDetail },
},{
    initialRouteName: 'TransactionsPage',
    headerMode: 'none',
}))


export default AppNavigator