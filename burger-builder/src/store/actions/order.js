import { PURCHASE_FAILED, PURCHASE_SUCCESS, PURCHASE_START, PURCHASE_INIT, ORDERS_FAIL, ORDERS_START, ORDERS_SUCCESS } from './types';
import axios from '../../axios-orders';

export const purchaseSuccess = (id, orderData) => ({
  type: PURCHASE_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseFailed = (error) => ({
  type: PURCHASE_FAILED,
  error,
});

export const purchaseBurgerStart = () => ({
  type: PURCHASE_START,
});

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart());
  axios.post('/orders.json', orderData)
    .then(res => {
      dispatch(purchaseSuccess(res.data.name, orderData));
    })
    .catch(error => {
      dispatch(purchaseFailed(error));
    });
};

export const purchaseInit = () => ({
  type: PURCHASE_INIT,
});

export const fetchOrdersStart = () => ({
  type: ORDERS_START,
});

export const fetchOrdersSuccess = (orders) => ({
  type: ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = (error) => ({
  type: ORDERS_FAIL,
  error,
});

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart());
  axios.get('/orders.json')
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => {
      dispatch(fetchOrdersFail(error));
    });
};
