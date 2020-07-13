import { combineReducers } from 'redux'
import user from './user'
import enumList from './enum'
import counter from './counter'

export default combineReducers({
  user,
  counter,
  enum: enumList,
})