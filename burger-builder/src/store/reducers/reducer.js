import { combineReducers } from 'redux';
import burgerBuilder from './burger';
import orderReducer from './order';

const reducer = combineReducers({
  burger: burgerBuilder,
  order: orderReducer,
})

export default reducer;
