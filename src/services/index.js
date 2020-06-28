import axios from 'axios';
import config from '../constants/config'

export const getItems = async (query, o) => {

  try {
    let url = `${config.apihost}/api/music?query=${query}&offset=${o}`
    let hash = hashstr(url)
    if (sessionStorage.getItem(hash) === null) {
      const response = await axios.get(url);
      if (!response.data.status) {
        return { 'items': [], count: 0 }
      }

      if (response.data.status){
        sessionStorage.setItem(hash, JSON.stringify(response.data.response))
        return response.data.response;
      }
      
    }

    else {
      return JSON.parse(sessionStorage.getItem(hash))
    }

  } catch (error) {
    return { 'items': [], count: 0 }
  }
}
const hashstr = s => {
  let hash = 0;
  if (s.length === 0) return hash;
  for (let i = 0; i < s.length; i++) {
    let char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}