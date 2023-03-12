
import axios from 'axios'



export const useResource = (baseUrl) => {

    let token = null;
    const setToken = (newToken) => {
      token = `bearer ${newToken}`;
    };

  
    const getAll = async (resource) => {
      try {
        const response = await axios.get(baseUrl)      
        
        console.log(response.data)
        return response.data
      
      }
      catch (e) {
        console.log(e.response.data)
      }
    }
  
    const create = async (resource) => {

      const config = {
        headers: { Authorization: token },
      };

      try {
        const response = await axios.post(baseUrl, resource, config)      
        console.log(response.data)
        return response.data
      }
      catch (e) {
        console.log(e.response.data)
      }
    }

    const update = async (id, resource) => {

      const config = {
        headers: { Authorization: token },
      };

      try {
        const response = await axios.put(`${baseUrl}/${id}`, resource, config)      
        console.log(response.data)
        return response.data
      }
      catch (e) {
        console.log(e.response.data)
      }
    }

    const remove = async (id) => {

      const config = {
        headers: { Authorization: token },
      };

      try {
        const response = await axios.delete(`${baseUrl}/${id}`, config)      
        console.log(response.data)
        return response.data
      }
      catch (e) {
        console.log(e.response.data)
      }
    }
  
    const service = {
      getAll,
      setToken,
      create,
      update,
      remove
    }
  
    return [
      service
    ]
}

//  E.G. const [persons, personService] = useResource('http://localhost:3005/persons')

//export default { useResource };