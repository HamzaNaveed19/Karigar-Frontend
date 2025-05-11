// redux/store.js

// Action Types
const SET_USER_ID = 'SET_USER_ID';
const CLEAR_USER_ID = 'CLEAR_USER_ID';

// Action Creators
export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: userId
});

export const clearUserId = () => ({
  type: CLEAR_USER_ID
});

// Initial State
const initialState = {
  userId: null
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload
      };
    case CLEAR_USER_ID:
      return {
        ...state,
        userId: null
      };
    default:
      return state;
  }
};

// Create store
const createStore = (reducer, initialState) => {
  let state = initialState;
  const listeners = [];

  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };
  
  // Initialize the store
  dispatch({ type: '@@INIT' });
  
  return { getState, dispatch, subscribe };
};

// Create and export the store
const store = createStore(reducer, initialState);
export default store;