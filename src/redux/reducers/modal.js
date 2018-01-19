import { SHOW_MODAL, HIDE_MODAL } from '../../constants/ActionTypes';


const initialState = {
  type:null
}

function modalReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      console.log(state);
      console.log(Object.assign({}, state, { type: action.modalType }));
      return Object.assign({}, state, { type: action.modalType })
    case HIDE_MODAL:
      return { type: null }
    default:
      return state;
  }
}

export default modalReducer;
