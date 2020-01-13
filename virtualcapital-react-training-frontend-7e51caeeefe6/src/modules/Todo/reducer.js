// @flow
import {
  FILTER_TODO_SUCCESS,
  GET_ALL_COMPLETEDCOUNT_SUCCESS
} from "./actionTypes";

const initialState = {
  todoList: [],
  completeCount: ""
};


export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FILTER_TODO_SUCCESS:
      return {
        ...state,
        todoList: action.payload,
      }
    case GET_ALL_COMPLETEDCOUNT_SUCCESS:
      return {
        ...state,
        completeCount: action.payload,
      };
    default:
      return state;
  }
};