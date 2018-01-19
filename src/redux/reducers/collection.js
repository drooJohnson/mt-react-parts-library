import { CHANGE_SELECTED_COLLECTION, CLEAR_SELECTED_COLLECTION } from '../../constants/ActionTypes';

const initialState = {
  Name:'',
  Parts:undefined,
  id:''
}

function collectionReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_COLLECTION:
      return action.collection
    case CLEAR_SELECTED_COLLECTION:
      return initialState
    default:
      return state
  }
}

export default collectionReducer;
