export const delay = ms => new Promise(res => setTimeout(res, ms));

const getMinutes = (times) => {
    let timePairs = []
    for(let i=0; i<times.length; i++){
        let data = {
            mins: ((times[i].hours * 60) + times[i].minutes + (times[i].seconds / 60)),
            skill: times[i].cat
        }
        timePairs.push(data)
    }
    console.log(timePairs, "TIME PAIRS")
    return timePairs;
}
export const createColumns = (times, cats) => {
    const tps = getMinutes(times)
    console.log(tps, "Top Create Cols Func")
    let columns = [];
    for(let i=0; i<cats.length; i++){
        var data = {
            skill: cats[i].title,
            total: 0,
            id: cats[i].id
        }
        columns.push(data)
    }
    console.log(columns, "Mid Create Cols Func")
    for(let j=0; j<columns.length; j++){
        for(let i=0; i<tps.length; i++){
            if(columns[j].id === tps[i].skill){
                columns[j].total += tps[i].mins
            }
        }
    }
    console.log(columns, "End Create Cols Func")
    return columns;
}


export const parseIDs = (times) => {
    let res = [];
    for(let i=0; i<times.length; i++){
        res.push(parseInt(times[i].id))
    }
    return res;
}

export const getTotal = (ts) => {
    let h = 0;
    let m = 0;
    let s = 0;
    for(let i=0; i<ts.length; i++){
        h += ts[i].hours
        m += ts[i].minutes
        s += ts[i].seconds
    }
    const data = {
        hrs : h,
        mins: m,
        secs: s
    }
    return data;
}