import {STORE_RESULT, DEL_RESULT} from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    result: []
}

const delResult = (state, action) => {
  const updatedArray = state.result.filter(result => result.id !== action.resElId)
  return updateObject(state, {result: updatedArray});
};

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_RESULT:
        return updateObject(state, {result: state.result.concat({value: action.result, id: new Date()})});
      case DEL_RESULT:
        return delResult(state, action);
      default:
        return state;
    }
};

export default resultReducer;
