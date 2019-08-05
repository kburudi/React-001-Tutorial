import { STORE_RESULT, DEL_RESULT } from './types';

export const saveResult = (result) => ({
  type: STORE_RESULT,
  result,
});

export const storeResult = result => (dispatch, getState) => setTimeout(
  () => {
    // console.log('get old counter ==> ', getState().counter)
    dispatch(saveResult(result));
  }, 2000
);

export const deleteResult = (id) => ({
  type: DEL_RESULT,
  resElId: id,
})
