import { INCREAMENT, DECREAMENT, ADD, SUBTRACT } from './types';

export const increament = () => ({
  type: INCREAMENT,
})

export const decreament = () => ({
  type: DECREAMENT,
})

export const add = (value) => ({
  type: ADD,
  val: value,
})

export const subtract = (value) => ({
  type: SUBTRACT ,
  val: value,
})
