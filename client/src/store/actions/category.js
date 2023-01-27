import {
    LOAD_CAT_SUCCESS, LOAD_CAT_FAIL,
    LOAD_CATS_SUCCESS, LOAD_CATS_FAIL,
    UPLOAD_CAT_SUCCESS, UPLOAD_CAT_FAIL
} from '../types'
import {
    GetCategories, GetCategoryById, CreateCategory
} from '../services/CatServices'

export const load_cats = () => async dispatch => {
    try{
        const res = await GetCategories()
        if(res.status === 200){
            dispatch({
                type: LOAD_CATS_SUCCESS,
                payload: res.data
            })
        }else{
            console.log(res, "err 1")
            dispatch({
                type: LOAD_CATS_FAIL
            })
        }
    }catch(err){
        console.log(err, "err 1")
        dispatch({
            type: LOAD_CATS_FAIL
        })
    }
}
export const load_cat_by_id = (id) => async dispatch => {
    try{
        const res = await GetCategoryById(id)
        if(res.status === 200){
            dispatch({
                type: LOAD_CAT_SUCCESS,
                payload: res.data
            })
        }else{
            console.log(res, "err 1")
            dispatch({
                type: LOAD_CAT_FAIL
            })
        }
    }catch(err){
        console.log(err, "err 1")
        dispatch({
            type: LOAD_CAT_FAIL
        })
    }
}
export const upload_cat = (cat) => async dispatch => {
    try{
        const res = await CreateCategory(cat)
        if(res.status === 201 || res.statusText === 'Created'){
            dispatch({
                type: UPLOAD_CAT_SUCCESS
            })
        }else{
            console.log(res, "err 1")
            dispatch({
                type: UPLOAD_CAT_FAIL
            })
        }
    }catch(err){
        console.log(err, "err 1")
        dispatch({
            type: UPLOAD_CAT_FAIL
        })
    }
}