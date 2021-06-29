import { combineReducers } from 'redux'
import { userReducer } from './userReducer'

export const mainReducer = combineReducers({
  USER_STATE: userReducer
})
