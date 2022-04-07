// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  START_REQUEST,
  RECEIVE_REQUEST_SUCCESS,
  RECEIVE_REQUEST_FAILURE,
  ADD_EXPENSE,
  DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case START_REQUEST:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_REQUEST_SUCCESS:
    return ({
      ...state,
      isFetching: false,
      currencies: [...state.currencies, ...Object.keys(action.data)]
        .filter((coin) => coin !== 'USDT'),
    });
  case RECEIVE_REQUEST_FAILURE:
    return ({
      ...state,
      isFetching: false,
      error: action.error,
    });
  case ADD_EXPENSE:
    return ({
      ...state,
      isFetching: false,
      expenses: [...state.expenses, action.expense],
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      isFetching: false,
      expenses: [...action.expense],
    });
  default:
    return state;
  }
}

export default wallet;
