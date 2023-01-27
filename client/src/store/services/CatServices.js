import Client from "./api";

// Category Services
export const GetCategories = async () => {
    try{
        const res = await Client.get('cat/')
        return res
    }catch(err){console.log(err)}
}

export const GetCategoryById = async (id) => {
    try{
        const res = await Client.get(`cat/${id}/`)
        return res
    }catch(err){console.log(err)}
}

export const CreateCategory = async (title) => {
    console.log(title, "BEfore TRY")
    try {
        const data = {
            title: title
        }
        const res = await Client.post(`cat/`, data)
        return res
    } catch (err) {console.log(err)}
}