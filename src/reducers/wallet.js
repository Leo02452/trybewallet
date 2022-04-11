import {
  START_REQUEST,
  RECEIVE_REQUEST_SUCCESS,
  RECEIVE_REQUEST_FAILURE,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_MODEON,
  EDIT_MODEOFF,
} from '../actions';

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
      expenses: [...state.expenses, action.expense],
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: [...action.expense],
    });
  case EDIT_MODEON:
    return ({
      ...state,
      editMode: true,
      expenseToEdit: action.expense,
    });
  case EDIT_MODEOFF:
    return ({
      ...state,
      editMode: false,
      expenses: [...action.editedExpenses],
    });
  default:
    return state;
  }
}

export default wallet;
