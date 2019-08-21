import {
  ADD_INGREDIENT, REMOVE_INGREDIENT, GET_INGREDIENTS, GET_INGREDIENTS_FAILED
} from './types';
import axios from '../../axios-orders';

export const addIngredient = (name) => ({
  type: ADD_INGREDIENT,
  ingredientName: name,
});

export const removeIngredient = (name) => ({
  type: REMOVE_INGREDIENT,
  ingredientName: name,
});

export const getIngredients = ingredients => ({
  type: GET_INGREDIENTS,
  ingredients,
});

export const getIngredientsFail = () => ({
  type: GET_INGREDIENTS_FAILED,
});

export const initIngredients = () => dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        dispatch(getIngredients(res.data));
      })
      .catch(error => {
        dispatch(getIngredientsFail());
      });
};
