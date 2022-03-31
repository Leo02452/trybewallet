// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  START_REQUEST,
  RECEIVE_REQUEST_SUCCESS,
  RECEIVE_REQUEST_FAILURE } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    isFetching: false,
    error: '',
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case START_REQUEST:
    return ({
      ...state,
      wallet: { isFetching: true },
    });
  case RECEIVE_REQUEST_SUCCESS:
    return ({
      ...state,
      wallet: { isFetching: false, currencies: action.data },
    });
  case RECEIVE_REQUEST_FAILURE:
    return ({
      ...state,
      wallet: { isFetching: false, error: action.error },
    });
  default:
    return state;
  }
}

export default wallet;
