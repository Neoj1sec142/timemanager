import Client from "./api";
// TS Services
export const GetTSs = async () => {
    try{
        const res = await Client.get('ts/')
        console.log(res, "BLOG RES")
        return res
    }catch(err){console.log(err)}
}

export const GetTSById = async (id) => {
    try{
        const res = await Client.get(`ts/${id}/`)
        return res
    }catch(err){console.log(err)}
}

export const GetTSsByCat = async (id) => {
    try{
        const res = await Client.get(`ts/cat/${id}/`)
        // console.log(res)
        return res
    }catch(err){console.log(err)}
}

export const CreateTS = async (ts) => {
    console.log(ts, "BEfore TRY")
    try {
        const data = {
            hours: ts.hours,
            minutes: ts.minutes,
            seconds: ts.seconds,
            cat: ts.cat
        }
        console.log(data, "Before axios")
        const res = await Client.post(`ts/`, data)
        return res
    } catch (err) {console.log(err)}
}
    
export const RemoveTS = async (id) => {
    try{
        const res = await Client.delete(`ts/${id}/`)
        console.log(res, "SOURCE")
        return res
    } catch (err) {console.log(err)}
}