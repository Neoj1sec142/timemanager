/* eslint-disable import/no-anonymous-default-export */
import {
    LOAD_TS_SUCCESS, LOAD_TS_FAIL,
    LOAD_TSS_SUCCESS, LOAD_TSS_FAIL,
    REMOVE_TS_SUCCESS, REMOVE_TS_FAIL,
    UPLOAD_TS_SUCCESS, UPLOAD_TS_FAIL,
    LOAD_TS_BY_CAT_SUCCESS, LOAD_TS_BY_CAT_FAIL
} from '../types'

const initialState = {
    tss: [],
    stamp: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOAD_TS_BY_CAT_SUCCESS:
        case LOAD_TSS_SUCCESS:
            return{
                ...state,
                tss: payload
            }
        case LOAD_TS_SUCCESS:
            return{
                ...state,
                stamp: payload
            }
        case LOAD_TS_BY_CAT_FAIL:
        case UPLOAD_TS_SUCCESS:
        case UPLOAD_TS_FAIL:
        case REMOVE_TS_SUCCESS:
        case LOAD_TSS_FAIL:
        case REMOVE_TS_FAIL:
        case LOAD_TS_FAIL:
            return{...state}
        default:
            return state
    }
}