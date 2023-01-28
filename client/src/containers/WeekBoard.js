import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { delay, parseIDs, getTotal } from '../utils/utils'
import {load_tss, destroy_ts} from '../store/actions/ts'
import {load_cats} from '../store/actions/category'
const WeekBoard = ({load_tss, destroy_ts, load_cats, tss, categories}) => {
    const [loading, setLoading] = useState(true)
    const [finished, setFinished] = useState(false)
    const [data, setData] = useState([])
    const [totalTime, setTotalTime] = useState(null)
    const formatItems = () => {
        let res = []
        for(let i=0; i<tss.length; i++){
            for(let j=0; j<categories.length; j++){
                if(tss[i].cat === categories[j].id){
                    const data = {
                        cat: categories[j].title,
                        hours: tss[i].hours,
                        minutes: tss[i].minutes,
                        seconds: tss[i].seconds
                    }
                    res.push(data)
                }
            }
        }
        setData(res);
        setFinished(true)
    }
    const fetchData = async () => {
        load_tss()
        await delay(750)
        load_cats()
        await delay(750)
        setLoading(false)
    }
    const handleShredder = async e => {
        e.preventDefault()
        if(window.confirm("Are you sure you want to remove all time stamps?")){
            const ids = parseIDs(tss)
            let length = ids.length - 1
            console.log(ids, "IDS")
            while(length >= 0){
                destroy_ts(ids[length])
                await delay(750)
                length--
                load_tss()
            }
        }
    }
    const handleTotal = e => {
        e.preventDefault()
        const res = getTotal(tss)
        setTotalTime(res)
    }
    
    useEffect(() => {if(loading)fetchData()},[])
    useEffect(() => {
        if(!loading && !finished){
            formatItems()
        }
    },[loading])
    if(!loading && finished){
        return (
            <div className='container-fluid'>
                <div className='d-flex justify-content-center mt-3'>
                    <div className='row w-75 border shadow-sm mt-3'>
                        <div className='row w-100 border bg-dark text-white shadow-lg m-1'>
                            <div className='float-start w-50 mt-2'>
                                <p className='fs-2 text-center w-50 ms-2'>Weekly Work {totalTime ? 
                                    (`${totalTime.hrs}H:${totalTime.mins}:M${totalTime.secs}:S`) : null}</p>
                            </div>
                            <div className='float-end w-50 mt-2'>
                                <button onClick={e=>handleShredder(e)} className='btn btn-danger mt-1 float-end w-50'>Shred Week</button>
                                <button onClick={e=>handleTotal(e)} className='btn btn-primary float-start mt-1 w-50'>Total Week</button>
                            </div>
                        </div>
                        <ul className='list-group w-100 bg-dark text-white'>
                            {data && data.length >= 1 ? data.map((item, index) => (
                            <li className='list-group-item bg-secondary ms-2 mt-1' key={index}>
                                <p>{item.cat} | {item.hours}hrs:{item.minutes}min:{item.seconds}sec</p>
                            </li>)):<li className='list-group-item bg-secondary ms-2 mt-1'>You Have No TimeStamps This Week</li>}    
                        </ul>
                    </div>
                </div>

            </div>
        )
    }else{ return( <div>Loading...</div> ) }
}

const mapStateToProps = state => ({
    tss: state.ts.tss,
    categories: state.category.categories
})

export default connect(mapStateToProps, {load_tss, destroy_ts, load_cats})(WeekBoard);