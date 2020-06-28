import {getItems} from '../services/index'
export const laudio=(payload)=>(
    { type:'LOADAUDIO',
      payload
   } 
)
export const paudio=()=>(
    { type:'PLAYAUDIO'
   }
)
export const psaudio=()=>(
    { type:'PAUSEAUDIO'
   }
)
export const raudio=()=>(
    { type:'TOGGLEREPEAT'
   }
)
export const loadfun=(payload)=>(
  { type:'LOADFUNC',
    payload
 }
)
export const changequery=(payload)=>(
  { type:'CHANGE_QUERY',
    payload
  }
)
export const tvol=(payload)=>(
  { type:'TOGGLE_VOL',
    payload
  }
)
export const changeindex=(payload)=>(
  { type:'CHANGE_INDEX',
    payload
  }
)
export const changetrack=(payload)=>(
  { type:'CHANGE_TRACK',
    payload
  }
)
export const loadaudio=(payload)=>{
     return (dispatch)=>{
     return new Promise((resolve, reject)=>{
        dispatch({
          type: 'LOADAUDIO',
          payload
         });
        resolve()
      })
    }
 }
 
export const loadsongs=(payload)=>{
  return (dispatch)=>{
    getItems(payload.query,payload.offset).then((data)=>{
    dispatch({type:'RECEIVE_SONGS',payload:data})
    })
  }
}
export const loadsongsnew=(payload)=>{
  return (dispatch)=>{
     dispatch({type:'REQUEST_SONGS'})
     getItems(payload.query,payload.offset).then((data)=>{
     dispatch({type:'RECEIVE_SONGS_NEW',payload:data})
     dispatch({type:'REQUEST_COMP'})
     
    })
 }
}
export const changebackg=(payload)=>{
 return (dispatch)=>{
    let def='linear-gradient(rgb(24, 24, 24), rgb(14, 5, 1) 85%)' 
    let color=null;
     if(localStorage.getItem('backg')==null){
        color=def
     }
     else{
      color=localStorage.getItem('backg')
     }
     if(payload.color===undefined){
      dispatch({type:'CHANGE_BACKG',payload:{color}})
    }
    if(payload.color!==undefined){
    dispatch({type:'CHANGE_BACKG',payload:{color:payload.color}})
    localStorage.setItem('backg',payload.color);
  }
 }
}
export const changeCacheState=(payload)=>{
  return (dispatch)=>{
      let cachefiles=JSON.parse(localStorage.getItem('cache_files'))
      if(cachefiles==null){
        localStorage.setItem('cache_files',true)
        cachefiles=JSON.parse(localStorage.getItem('cache_files'))
      }
      if(payload.cachefiles===undefined){
        dispatch({type:'CHANGE_CACHE_STATE',payload:{cachefiles}})
      }
      if(payload.cachefiles!==undefined){
        dispatch({type:'CHANGE_CACHE_STATE',payload:{cachefiles:payload.cachefiles}})
        localStorage.setItem('cache_files',payload.cachefiles)
      }

  }
 }
