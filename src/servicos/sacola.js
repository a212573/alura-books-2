import axios from "axios"

const sacolaAPI = axios.create({
    baseURL: 'http://localhost:8000/sacola/'
})

async function getSacola(){
    const response = await sacolaAPI.get('/')
    return response.data
}

async function postSacola(id) {
   await sacolaAPI.post(`/${id}`)   
}

async function deleteSacola(id) {
    await sacolaAPI.delete(`/${id}`)   
}

export {
    getSacola,
    postSacola,
    deleteSacola
}
