// Coloque aqui suas actions
export const START_REQUEST = 'START_REQUEST';
export const RECEIVE_REQUEST_SUCCESS = 'RECEIVE_REQUEST_SUCCESS';
export const RECEIVE_REQUEST_FAILURE = 'RECEIVE_REQUEST_FAILURE';
export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const startRequest = () => ({
  type: START_REQUEST,
});

const requestSuccess = (data) => ({
  type: RECEIVE_REQUEST_SUCCESS,
  data,
});

const requestFailure = (error) => ({
  type: RECEIVE_REQUEST_FAILURE,
  error,
});

export const getCoinPrice = () => async (dispatch) => {
  dispatch(startRequest());
  try {
    const coinInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await coinInfo.json();
    dispatch(requestSuccess(result));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};

export const dispatchUser = (email) => ({
  type: ADD_USER,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});
