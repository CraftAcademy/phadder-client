import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import roleReducer from './roleReducer'

const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
  role: roleReducer
});

export default rootReducer;