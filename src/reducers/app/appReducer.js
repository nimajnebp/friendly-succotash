import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from 'consts/actionTypes';

import initialState from './initialState.json';

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TODO: {
      const { id, content, created } = action.payload;
      return {
        ...state,
        todos: [
          ...state.todos,
          { id, content, isDone: false, isEditing: false, created },
        ],
      };
    }
    case UPDATE_TODO: {
      const { id, k, v } = action.payload;
      return {
        ...state,
        todos: state.todos.map((e) => ((e.id === id) ? { ...e, [k]: v } : e)),
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        todos: state.todos.filter((e) => id !== e.id),
      };
    }
    default:
      return state;
  }
};

export default appReducer;
