import { combineReducers } from "redux";
import alert from './alert'
import category from './category'
import ts from './ts'

export default combineReducers({
    alert,
    category,
    ts
})