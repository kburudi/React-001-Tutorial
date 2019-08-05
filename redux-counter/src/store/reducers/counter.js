import {
  INCREAMENT, DECREAMENT, ADD, SUBTRACT
} from '../actions/types';

import { updateObject } from '../utility';

const initialState = {
    counter: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREAMENT:
        return updateObject(state, {counter: state.counter + 1});
      case DECREAMENT:
        return updateObject(state, {counter: state.counter - 1});
      case ADD:
        return updateObject(state, {counter: state.counter + action.val});
      case SUBTRACT:
        return updateObject(state, {counter: state.counter - action.val});
      default:
        return state;
    }
};

export default counterReducer;
