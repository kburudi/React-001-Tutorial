import {combineReducers} from 'redux';
import counterReducer from './reducers/counter';
import resultReducer from './reducers/store';

const reducer = combineReducers({
  counter: counterReducer,
  result: resultReducer
})

export default reducer;
