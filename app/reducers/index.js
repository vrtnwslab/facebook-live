import {combineReducers} from 'redux'
import { reducer as form } from 'redux-form'
import data from './reducer_data'
import facebook from './reducer_facebook'
import settings from './reducer_settings'
import firebase from './reducer_firebase'

export default combineReducers({
  data,
  facebook,
  settings,
  firebase,
  form
})
