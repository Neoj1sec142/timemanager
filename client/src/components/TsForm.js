import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {load_cats} from '../store/actions/category'
import {upload_ts} from '../store/actions/ts'
import {delay} from '../utils/utils'

const TsForm = ({load_cats, upload_ts, categories}) => {
    const fetchCats = async () => {
        load_cats()
        await delay(750)
        setLoading(false)
    }
    useEffect(() => {if(loading) fetchCats()},[])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        cat: '',
        msg: ''
    })
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    // const onSelect = e => setFormData({...formData, [e.target.name]: e.target.key})
    const onSubmit = async e => {
        e.preventDefault()
        let cat_id;
        for(let i=0; i<categories.length; i++){
            if(formData.cat === categories[i].title){
                cat_id = categories[i].id
            }
        }
        formData.cat = cat_id;
        await delay(150)
        upload_ts(formData)
        await delay(750)
        cancel()
    }
    const cancel = () => {
        if(window.confirm("Leave the page?")){
            navigate('/')
        }else{
            setFormData({
                hours: 0,
                minutes: 0,
                seconds: 0,
                cat: null,
                msg: ''
            })
        }
    }
    const {hours, minutes, seconds, cat} = formData;
    if(!loading){
        return (
            <div className='container-fluid'>
                <div className='d-flex justify-content-center mt-3'>
                    <div className='row w-75 h-75 bg-light shadow-sm border mt-3 mb-3'>
                        <form className='mt-2' onSubmit={e=>onSubmit(e)}>
                            <div className='form-group mt-1 mb-1'>
                                <input className='form-control' type='number' onChange={e=>onChange(e)} name='hours' value={hours}  />
                            </div>
                            <div className='form-group mt-1 mb-1'>
                                <input className='form-control' type='number' onChange={e=>onChange(e)} name='minutes' value={minutes}  />
                            </div>
                            <div className='form-group mt-1 mb-1'>
                                <input className='form-control' type='number' onChange={e=>onChange(e)} name='seconds' value={seconds}  />
                            </div>
                            <div className='form-group'>
                                {categories && categories.length >= 1 ? ( 
                                <select className='form-control' onChange={e=>onChange(e)} name='cat' value={cat}>
                                    {categories.map((item, index) => (
                                    <option key={index}>{item.title}</option>))}
                                </select>):null}
                            </div>
                            <div className='d-flex justify-content-evenly mt-3 mb-3'>
                                <button className='btn btn-primary' type='Submit'>Send</button>
                                <button className='btn btn-primary' onClick={cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }else{ return( <div>Loading...</div> ) }
}

const mapStateToProps = state => ({
    categories: state.category.categories
})

export default connect(mapStateToProps, {load_cats, upload_ts})(TsForm)