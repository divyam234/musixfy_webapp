import React,{memo} from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeindex, changetrack } from '../actions/index'
import config from '../constants/config'

const MusicItem = (props) => {

  const getdur = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    let str;
    if (seconds < 10)
      str = minutes.toString() + ':0' + seconds.toString();
    else
      str = minutes.toString() + ':' + seconds.toString();
    return str;
  }

  let style = { 'backgroundColor': '#c1c1c11a' }
  if (props.curr === props.index) {
    style = { 'backgroundColor': 'rgba(0, 0, 0, 0.580)' }
  }

  let downloadUrl = `${config.apihost}/api/download/music?encoded_url=${props.data['encoded_url']}&cache=${props.cacheFiles}`
  let streamUrl = `${config.apihost}/api/stream/music?encoded_url=${props.data['encoded_url']}&cache=${props.cacheFiles}`
  
  return (
    <li className="tracklistitem" style={style}>
      <div className="outercontrol">
        <svg x="0px" y="0px" onClick={() => {
          props.changeindex({ index: props.index });
          props.changetrack({ title: props.data['title'], artist: props.data['artist'] });
          props.loadAudio(streamUrl);
        }}
          viewBox="0 0 54 54" style={{ "enableBackground": "new 0 0 54 54", 'cursor': 'pointer' }} width="40" height="40">
          <g>
            <g>
              <path style={{ "fill": "#1db954" }} d="M27,53L27,53C12.641,53,1,41.359,1,27v0C1,12.641,12.641,1,27,1h0c14.359,0,26,11.641,26,26v0
                C53,41.359,41.359,53,27,53z"/>
              <path style={{ "fill": "#1db954" }} d="M27,54C12.112,54,0,41.888,0,27S12.112,0,27,0s27,12.112,27,27S41.888,54,27,54z M27,2
                C13.215,2,2,13.215,2,27s11.215,25,25,25s25-11.215,25-25S40.785,2,27,2z"/>
            </g>
            <g>
              <path style={{ "fill": "#181818" }} d="M36.144,28.017l-15.101,8.719C20.579,37.004,20,36.669,20,36.134V18.696
                c0-0.535,0.579-0.87,1.043-0.602l15.101,8.719C36.608,27.081,36.608,27.75,36.144,28.017z"/>
              <path style={{ "fill": "#181818" }} d="M20.697,37.83c-0.936,0-1.697-0.761-1.697-1.696V18.696C19,17.761,19.761,17,20.697,17
                c0.295,0,0.588,0.078,0.846,0.228l15.101,8.719c0.531,0.307,0.848,0.855,0.848,1.469s-0.317,1.162-0.848,1.469l-15.101,8.719
                C21.285,37.752,20.992,37.83,20.697,37.83z M21,19.224v16.383l14.187-8.191L21,19.224z"/>
            </g>
          </g>
        </svg>
      </div>
      <div className="trackinfo">
        <div className="trackwrapper oneline">
          <span className="tracklist-name">{props.data['title']}</span>
          <span className="second-line oneline">{props.data['artist']}</span>
        </div>
      </div>
      <div className="download">

        <a href={downloadUrl}><svg x="0px" y="0px" viewBox="0 0 299.998 299.998" style={{ "enableBackground": "new 0 0 54 54", 'cursor': 'pointer' }} width="40" height="40">
          <g>
            <g>
              <path d="M149.995,0C67.156,0,0,67.159,0,149.997c0,82.837,67.156,150,149.995,150s150.003-67.163,150.003-150    C299.997,67.159,232.834,0,149.995,0z M110.967,105.357c2.075-2.075,4.793-3.112,7.511-3.112c2.718,0,5.434,1.037,7.508,3.112    l13.297,13.295v-3.911V62.477c0-5.867,4.754-10.621,10.621-10.621s10.621,4.754,10.621,10.621v52.263v4.63l4.63-4.63l9.386-9.384    c2.075-2.075,4.79-3.112,7.508-3.112s5.436,1.037,7.511,3.112c2.552,2.549,3.522,6.079,2.933,9.384    c0,0.003-0.003,0.005-0.003,0.008c-0.044,0.239-0.119,0.469-0.179,0.703c-0.091,0.366-0.189,0.729-0.322,1.084    c-0.088,0.239-0.189,0.472-0.296,0.705c-0.166,0.371-0.358,0.726-0.568,1.079c-0.112,0.187-0.215,0.373-0.34,0.552    c-0.363,0.524-0.76,1.032-1.227,1.499l-15.115,15.115l-16.591,16.591c-2.077,2.075-4.793,3.105-7.508,3.105    c-0.026,0-0.052,0-0.078,0s-0.054,0-0.078,0c-2.715,0-5.431-1.03-7.508-3.105l-16.591-16.591l-15.115-15.115    c-0.467-0.467-0.864-0.973-1.222-1.496c-0.127-0.184-0.231-0.373-0.345-0.56c-0.207-0.35-0.397-0.703-0.563-1.069    c-0.109-0.239-0.213-0.475-0.301-0.718c-0.127-0.348-0.223-0.7-0.314-1.056c-0.062-0.246-0.143-0.485-0.187-0.734    C107.444,111.436,108.412,107.906,110.967,105.357z M231.574,209.315h-0.003c0,14.337-14.057,25.568-32.005,25.568h-99.132    c-17.945,0-32.005-11.23-32.005-25.568V140.31c0-12.117,10.058-21.988,24.004-24.761c0.604,5.981,3.224,11.526,7.534,15.834    l4.108,4.108h-3.641c-7.265,0-11.256,3.621-11.256,4.819v69.005c0,1.201,3.992,4.819,11.256,4.819h99.135    c7.265,0,11.256-3.621,11.256-4.819V140.31c0-1.198-3.992-4.819-11.256-4.819h-3.12l4.111-4.111    c4.282-4.279,6.894-9.786,7.516-15.727c13.681,2.913,23.498,12.69,23.498,24.66V209.315z" fill="#1db954" />
            </g>
          </g>
        </svg></a>
      </div>
      <div className="duration">
        <span>{getdur(props.data['duration'])}</span>
      </div>
    </li>
  )
}
const mapStateToProps = (state) => {
  return {
    curr: state.audiolist.currentindex,
    loadAudio: state.audio.controlfun === null ? {} : state.audio.controlfun.loadAudio,
    cacheFiles: state.cacheFiles.cachefiles,

  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeindex,
    changetrack
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(MusicItem));