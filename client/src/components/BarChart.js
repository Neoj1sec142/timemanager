import React, { useState, useEffect } from 'react'
import { SeriesCollectionDirective, SeriesDirective, Inject, Legend, ChartComponent, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts'
import { barPrimaryXAxis, barPrimaryYAxis } from './dummy'
import { connect } from 'react-redux'
import {load_tss} from '../store/actions/ts'
import {load_cats} from '../store/actions/category'
import { delay, createColumns } from '../utils/utils'

const BarChart = ({load_tss, load_cats, tss, categories, width, height}) => {
    const [currentMode, setMode] = useState('Dark')
    const [loading, setLoading] = useState(true)
    const [finished, setFinished] = useState(false)
    const [barChartData, setBarChartData] = useState([])
    const fetchData = async () => {
        load_cats()
        await delay(750)
        load_tss()
        await delay(750)
        setLoading(false)
    }
    const formatData = async () => {
        const cols = createColumns(tss, categories)
        let data = []
        if(cols){
            cols.forEach((item) => {
                const newItem = {
                    x: item.skill,
                    y: item.total
                }
                data.push(newItem)
            })
        }
        const arr1 = [data[0], data[1], data[2]]
        const arr2 = [data[3], data[4], data[5]]
        const arr3 = [data[6], data[7], data[8]]
        const final = [arr1, arr2, arr3]
        setBarChartData(final)
        setFinished(true)
    }
    useEffect(() => { if(loading) fetchData() },[])
    useEffect(() => {
        if(!loading && !finished){ formatData() }
    },[loading])
    const barCustomSeries = [
        {
          dataSource: barChartData[0],
          xName: 'x',
          yName: 'y',
          name: 'Gold',
          type: 'Column',
          marker: {
            dataLabel: {
              visible: true,
              position: 'Top',
              font: { fontWeight: '600', color: '#ffffff' },
            },
          },
        },
        {
          dataSource: barChartData[1],
          xName: 'x',
          yName: 'y',
          name: 'Silver',
          type: 'Column',
          marker: {
            dataLabel: {
              visible: true,
              position: 'Top',
              font: { fontWeight: '600', color: '#ffffff' },
            },
          },
        },
        {
          dataSource: barChartData[2],
          xName: 'x',
          yName: 'y',
          name: 'Bronze',
          type: 'Column',
          marker: {
            dataLabel: {
              visible: true,
              position: 'Top',
              font: { fontWeight: '600', color: '#ffffff' },
            },
          },
        },
    ];
    
    
    if(!loading && finished){
        return (
            <div className='m-4 md:m-10 mt-24 p-10 rounded-xl'>
            
            <ChartComponent id="area-chart"
                height="420px"
                primaryXAxis={barPrimaryXAxis}
                primaryYAxis={barPrimaryYAxis}
                chartArea={{ border: {width: 0}}}
                tooltip={{enable: true}}
                background={currentMode === 'Dark' ? '#33373E' : '#fff'}>
                <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                <SeriesCollectionDirective>
                {barCustomSeries.map((item, index) => (
                    <SeriesDirective key={index} {...item}/>
                ))}
                </SeriesCollectionDirective>
            </ChartComponent>
            </div>
        )
    }else{ return( <div>Loading....</div> ) }
}
const mapStateToProps = state => ({
    tss: state.ts.tss,
    categories: state.category.categories
})

export default connect(mapStateToProps, {load_tss, load_cats})(BarChart)