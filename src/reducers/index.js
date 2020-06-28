let initial = {
    audio: null,
    playing: false,
    id: 0,
    repeat: false,
    controlfun: null,
    vol: 0.8,
    mute: false
}
export const audio = (state = initial, action) => {
    switch (action.type) {
        case 'LOADAUDIO':
            return {
                ...state,
                audio: action.payload.audio,
                playing: true,
                id: action.payload.id,
                repeat: state.repeat,
            }
        case 'PLAYAUDIO':
            return {
                ...state,
                playing: true,
            }
        case 'PAUSEAUDIO':
            return {
                ...state,
                playing: false,
            }
        case 'TOGGLEREPEAT':
            if (state.repeat) {
                return { ...state, repeat: false }
            }
            else {
                return { ...state, repeat: true }
            }
        case 'LOADFUNC':
            return {
                ...state,
                controlfun: action.payload
            }
        case 'TOGGLE_VOL':
            if (state.mute) {
                return { ...state, mute: false }
            }
            else {
                return { ...state, mute: true }
            }
        default:
            return state;
    }
}

let audiostate =
{
    tracks: [],
    currentindex: -1 + '',
    loading: false,
    offset: 0,
    count: 0, query: null,
    currtrack: null
}

export const audiolist = (state = audiostate, action) => {
    switch (action.type) {
        case 'REQUEST_SONGS':
            return {
                ...state,
                loading: true
            }
        case 'REQUEST_COMP':
            return {
                ...state,
                loading: false
            }
        case 'RECEIVE_SONGS': {
            return {
                ...state,
                tracks: [...state.tracks, ...action.payload.items],
                offset: state.offset + action.payload.items.length
            }
        }
        case 'RECEIVE_SONGS_NEW': {
            return {
                ...state,
                tracks: action.payload.items,
                offset: action.payload.items.length,
                count: action.payload.count,
                currentindex: -1 + ''
            }
        }
        case 'CHANGE_INDEX':
            return {
                ...state,
                currentindex: action.payload.index
            }
        case 'CHANGE_QUERY':
            return {
                ...state,
                query: action.payload.query
            }
        case 'CHANGE_TRACK':
            return {
                ...state,
                currtrack: action.payload
            }
        default:
            return state;
    }

}
export const theme = (state = { background: null }, action) => {
    switch (action.type) {
        case 'CHANGE_BACKG':
            return {
                ...state,
                background: action.payload.color
            }
        default:
            return state
    }
}
export const cacheFiles = (state ={cachefiles:false}, action) => {
    switch (action.type) {
        case 'CHANGE_CACHE_STATE':
            return {
                ...state,
                cachefiles: action.payload.cachefiles
            }
        default:
            return state
    }
}