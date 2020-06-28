import {audio,audiolist,theme,cacheFiles} from './index';
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
export default (history) => combineReducers({
      router: connectRouter(history),
        audio,
        audiolist,
        theme,
        cacheFiles
})