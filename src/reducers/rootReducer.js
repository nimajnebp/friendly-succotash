import { combineReducers } from 'redux';
import appReducer from 'reducers/app/appReducer';

const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
