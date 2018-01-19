import { SHOW_SCRIM, HIDE_SCRIM } from '../../constants/ActionTypes';

const initialState = {
  display:'false',
  opacity:0,
  color:'dark',
  zIndex:'high',
}

function scrimReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_SCRIM:
      return Object.assign({}, state, action.scrim, {display: 'true'})
    case HIDE_SCRIM:
      return Object.assign({}, state, {opacity: 0, display: 'false'})
    default:
      return state;
  }
}

export default scrimReducer;
