import { TO_LIST, TO_GRID } from '../../constants/ActionTypes';

const initialState = 'grid';

function libraryLayoutReducer (state = initialState, action) {
  switch (action.type) {
    case TO_LIST:
      return 'list'
    case TO_GRID:
      return 'grid'
    default:
      return state;
  }
}

export default libraryLayoutReducer;
