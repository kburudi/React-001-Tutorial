import { PURCHASE_FAILED, PURCHASE_SUCCESS, PURCHASE_START, PURCHASE_INIT, ORDERS_START, ORDERS_SUCCESS, ORDERS_FAIL } from '../actions/types';

const initialState = {
  loading: false,
  orders: [],
  purchased: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      }
    case PURCHASE_FAILED:
      return {
        ...state,
        loading: false,
      }
    case PURCHASE_START:
      return {
        ...state,
        loading: true,
      }
    case PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      }
    case ORDERS_START:
      return {
        ...state,
        loading: true,
      }
    case ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      }
    case ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}

export default orderReducer;