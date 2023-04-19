// import axios from 'axios'
// const baseUrl = 'http://localhost:3001/notes'

// const getAll = () => {
//   return axios.get(baseUrl)
// }

// const create = newObject => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

// export default { 
//   getAll: getAll, 
//   create: create, 
//   update: update 
// }

import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
class Person {
  getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
  }
  
  create = async newObject => {
    const request = axios.post(baseUrl, newObject)
    const response = await request
    return response.data
  }
  
  update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    const response = await request
    return response.data
  }
  deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request
    return response.data
  }

}


export default Person