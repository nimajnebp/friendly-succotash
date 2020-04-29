import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from 'consts/actionTypes';

export const createTodo = (id, content) => ({
  type: CREATE_TODO,
  payload: { id, content, created: Date.now() },
});

export const updateTodo = (id, k, v) => ({
  type: UPDATE_TODO,
  payload: { id, k, v },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
});
