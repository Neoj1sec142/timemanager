/* eslint-disable import/no-anonymous-default-export */
import {
    LOAD_CAT_SUCCESS, LOAD_CAT_FAIL,
    LOAD_CATS_SUCCESS, LOAD_CATS_FAIL,
    UPLOAD_CAT_SUCCESS, UPLOAD_CAT_FAIL
} from '../types'

const initialState = {
    categories: [],
    cat: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOAD_CATS_SUCCESS:
            return{
                ...state,
                categories: payload
            }
        case LOAD_CAT_SUCCESS:
            return{
                ...state,
                cat: payload
            }
        case UPLOAD_CAT_SUCCESS:
        case UPLOAD_CAT_FAIL:
        case LOAD_CATS_FAIL:
        case LOAD_CAT_FAIL:
            return{...state}
        default:
            return state
    }
}