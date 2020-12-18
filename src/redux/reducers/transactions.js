import { REHYDRATE } from 'redux-persist/lib/constants';
import constants from '../_reduxConstants';

const initialState = {
  transactionsList: []
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: return state;
    case constants.SET_TRANSACTIONS: return { ...state, transactionsList: action.payload };
    case constants.CLEAR_DATA: return initialState;
    default: return state;
  };
};

export default transactionsReducer;
