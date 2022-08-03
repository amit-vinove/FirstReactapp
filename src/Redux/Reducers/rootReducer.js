import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import todosReducer from './todosReducer';

export const rootReducer = combineReducers({
    todos:todosReducer,
    profileInfo:profileReducer
})
// export default rootReducer;
