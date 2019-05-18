import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { rootReducer } from './reducers';

const SET_ADDRESS = 'SET_ADDRESS';
const SET_FILTERS = 'SET_FILTERS';

const initialState = {
  address: '',
  filters: {},
};

const reducer = (state = { initialState }, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return { ...state, address: action.address };
    case SET_FILTERS:
      return { ...state, filters: action.filters };
    default:
      return state;
  }
};

const setAddress = address => ({
  type: SET_ADDRESS,
  address,
});

const setFilters = filters => ({
  type: SET_FILTERS,
  filters,
});

export const getAddress = address => {
  return dispatch => {
    return dispatch(setAddress(address));
  };
};

export const getFilters = filters => {
  return dispatch => {
    return dispatch(setFilters(filters));
  };
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
