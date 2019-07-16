import actionTypes from '../../actions';

const initialState = {
    result: []
}

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.STORE_RESULT:
        return {
            ...state,
            result: state.result.concat({value: action.result, id: new Date()})
        }
      case actionTypes.DEL_RESULT:
        const updatedArray = state.result.filter(result => result.id !== action.resElId)
        return {
            ...state,
            result: updatedArray
        }
      default:
        return state;
    }
};

export default resultReducer;
