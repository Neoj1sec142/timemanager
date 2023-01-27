import {
    LOAD_TS_SUCCESS, LOAD_TS_FAIL,
    LOAD_TSS_SUCCESS, LOAD_TSS_FAIL,
    REMOVE_TS_SUCCESS, REMOVE_TS_FAIL,
    UPLOAD_TS_SUCCESS, UPLOAD_TS_FAIL,
    LOAD_TS_BY_CAT_SUCCESS, LOAD_TS_BY_CAT_FAIL
} from '../types'
import {
    GetTSs, GetTSById, GetTSsByCat, CreateTS, RemoveTS
} from '../services/TSServices'
import {setAlert} from './alert'

export const load_tss = () => async dispatch => {
    try{
        const res = await GetTSs()
        if(res.status === 200){
            dispatch({
                type: LOAD_TSS_SUCCESS,
                payload: res.data
            })
        }else{
            console.log(res, "err 1")
            dispatch({
                type: LOAD_TSS_FAIL
            })
        }
    }catch(err){
        console.log(err, "err 1")
        dispatch({
            type: LOAD_TSS_FAIL
        })
    }
}
export const load_ts_by_id = (id) => async dispatch => {
    try{
        const res = await GetTSById(id)
        if(res.status === 200){
            dispatch({
                type: LOAD_TS_SUCCESS,
                payload: res.data
            })
        }else{
            console.log(res, "err 1")
            dispatch({
                type: LOAD_TS_FAIL
            })
        }
    }catch(err){
        console.log(err, "err 1")
        dispatch({
            type: LOAD_TS_FAIL
        })
    }
}
export const load_ts_by_cat = (category_id) => async dispatch => {
    try{
        const res = await GetTSsByCat(category_id)
        if(res.status === 200){
            dispatch({
                type: LOAD_TS_BY_CAT_SUCCESS,
                payload: res.data
            })
        }else{
            console.log(res, "err 1")
            dispatch({
                type: LOAD_TS_BY_CAT_FAIL
            })
        }
    }catch(err){
        console.log(err, "err 1")
        dispatch({
            type: LOAD_TS_BY_CAT_FAIL
        })
    }
}
export const upload_ts = (ts) => async dispatch => {
    try{
        const res = await CreateTS(ts)
        if(res.status === 201 || res.statusText === 'Created'){
            dispatch({
                type: UPLOAD_TS_SUCCESS
            })
            dispatch(setAlert('TS Sent Successfully', 'success'))
        }else{
            console.log(res, "err 1")
            dispatch({
                type: UPLOAD_TS_FAIL
            })
            dispatch(setAlert('Error Sending TS', 'error'))
        }
    }catch(err){
        console.log(err, "err 1")
        dispatch({
            type: UPLOAD_TS_FAIL
        })
        dispatch(setAlert('Error Sending TS', 'error'))
    }
}
export const destroy_ts = (id) => async dispatch => {
    try{
        const res = await RemoveTS(id)
        if(res.status === 200 || res.statusText === 'No Content'){
            dispatch({
                type: REMOVE_TS_SUCCESS                
            })
            dispatch(setAlert('TS Removed Successfully', 'success'))
        }else{
            console.log(res, 'error 1')
            dispatch({
                type: REMOVE_TS_FAIL
            })
            dispatch(setAlert('Error Removing TS', 'error'))
        }
    }catch(err){
        console.log(err, 'error 2')
        dispatch({
            type: REMOVE_TS_FAIL
        })
        dispatch(setAlert('Error Removing TS', 'error'))
    }
}