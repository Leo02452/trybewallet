// Coloque aqui suas actions
export const START_REQUEST = 'START_REQUEST';
export const RECEIVE_REQUEST_SUCCESS = 'RECEIVE_REQUEST_SUCCESS';
export const RECEIVE_REQUEST_FAILURE = 'RECEIVE_REQUEST_FAILURE';
export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_MODEON = 'EDIT_MODEON';
export const EDIT_MODEOFF = 'EDIT_MODEOFF';
export const EXPENSE_TO_EDIT = 'EXPENSE_TO_EDIT';

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

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const editModeOn = (expense) => ({
  type: EDIT_MODEON,
  expense,
});

export const editModeOff = (editedExpenses) => ({
  type: EDIT_MODEOFF,
  editedExpenses,
});

// export const expenseToEdit = (expense) => ({
//   type: EXPENSE_TO_EDIT,
//   expense,
// });
