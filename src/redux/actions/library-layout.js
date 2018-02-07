import { TO_LIST, TO_GRID } from "../../constants/ActionTypes";

export const toListMode = () => {
  return {
    type: TO_LIST
  };
};

export const toGridMode = () => {
  return {
    type: TO_GRID
  };
};
