// Coloque aqui suas actions
export const START_REQUEST = 'START_REQUEST';
export const RECEIVE_REQUEST_SUCCESS = 'RECEIVE_REQUEST_SUCCESS';
export const RECEIVE_REQUEST_FAILURE = 'RECEIVE_REQUEST_FAILURE';

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

export default getCoinPrice = () => async () => {
  dispatch(startRequest());
  try {
    const coinInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    dispatch(requestSuccess(coinInfo));
  } catch (error) {
    dispatch(requestFailure(error));
  }
};
