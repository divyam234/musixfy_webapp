import React, { Component } from "react";
import noUiSlider from "nouislider/distribute/nouislider.min.js"
import Pbutton from "./pbutton";
import Next from "./Next";
import { Howl } from 'howler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadaudio, paudio, psaudio, raudio, loadfun, changeindex, tvol } from '../actions/index'
import config from '../constants/config'

class Control extends Component {
  seekSlider = null;
  volSlider = null;
  vol = 0.8
  durtimer = null;
  seektimer = null;
  
  componentDidMount() {
    this.seekSlider = document.getElementById('seek');
    noUiSlider.create(this.seekSlider, {
      start: 0,
      behaviour: 'snap',
      connect: [true, false],
      range: {
        'min': 0,
        'max': 100
      },
    });
    this.volSlider = document.getElementById('vol');
    noUiSlider.create(this.volSlider, {
      start: 80,
      behaviour: 'snap',
      connect: [true, false],
      range: {
        'min': 0,
        'max': 100
      },
    });
    this.props.loadfun({
      loadAudio: this.loadAudio,
      handlePlay: this.handlePlay, handlePause: this.handlePause, keypress: this.handleKeypress
    });
    document.addEventListener('keydown', this.handleKeypress)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeypress)
  }
  
  handleKeypress = (e) => {
    if (e.keyCode === 32) {
      (this.props.playing === true && this.props.id > 0) ? this.handlePause() : this.handlePlay()
    }
  }
  
  loadAudio = (src) => {
    clearTimeout(this.durtimer);
    this.offlisteners();
    this.refs.timer1.innerHTML = '&nbsp;';
    this.refs.timer2.innerHTML = '&nbsp;';
    if (this.props.audio !== undefined && this.props.audio !== null) {
      this.seekSlider.noUiSlider.set(0)
      clearTimeout(this.seektimer);
      this.props.audio.stop(this.props.id)
    }
    let audio = this.getHowlInstance(src);
    let id = audio.play();
    this.props.loadaudio({
      audio,
      id,
    }).then(() => {
      this.setListeners();
    })
  }
  
  getHowlInstance = (src) => {
    return new Howl({
      src: [src],
      html5: true,
      autoplay: false,
      preload: true,
      buffer: true,
      volume: this.vol,
      mute: this.props.mute
    });
  }
  
  setListeners = () => {
    let id = this.props.id;
    let audio = this.props.audio;
    let ref = this;
    audio.on('load', () => {
      clearTimeout(ref.durtimer);
      ref.durtimer = setInterval(ref.setdur, 1000);
    })
    audio.on('play', () => {
      clearTimeout(ref.seektimer);
      ref.seektimer = setInterval(ref.seekbar, 30);
    })
    audio.on('end', () => {
      ref.props.repeat ? ref.handlePlay() : ref.queue(1);
      clearTimeout(ref.seektimer);
    })
    audio.on('stop', () => {
      clearTimeout(ref.seektimer);
    })
    audio.on('pause', function () {
      clearTimeout(ref.seektimer);
    })
    this.seekSlider.noUiSlider.on('change', (value) => {
      let val = parseFloat(value[0]);
      let percentage = (val / 100);
      let currentTime = percentage * audio.duration(id);
      audio.seek(currentTime, id);
    });
    this.seekSlider.noUiSlider.on('slide', (value) => {

      clearTimeout(ref.seektimer);
    });
    this.seekSlider.noUiSlider.on('end', (value) => {
      ref.seektimer = setInterval(ref.seekbar, 30);
    });
    this.volSlider.noUiSlider.on('slide', (value) => {
      let val = parseFloat(value[0]);
      val = (val / 100).toFixed(2);
      ref.vol = val;
      audio.volume(val, id);
    })
  }
  
  offlisteners = () => {
    this.seekSlider.noUiSlider.off('slide');
    this.seekSlider.noUiSlider.off('change');
    this.seekSlider.noUiSlider.off('end');
    this.volSlider.noUiSlider.off('slide');
  }
  
  seekbar = () => {
    if (this.props.audio.playing(this.props.id)) {
      let value = (this.props.audio.seek(this.props.id) / this.props.audio.duration(this.props.id)) * 100;
      this.seekSlider.noUiSlider.set(value);
    }
  }
  
  handlePlay = () => {
    if (this.props.audio !== null && this.props.audio !== undefined) {
      this.props.paudio();
      this.playAudio();

    }
  }
  
  handlePause = () => {
    if (this.props.audio != null && this.props.audio !== undefined) {
      this.props.psaudio();
      this.pauseAudio();
    }
  }
  
  pauseAudio = () => {
    if (this.props.audio !== undefined || this.props.audio !== null) {
      if (this.props.audio.playing(this.props.id)) {
        this.props.audio.pause(this.props.id)
      }
    }
  }
  
  playAudio = () => {
    this.props.audio.play(this.props.id);
  }
  
  queue = (val) => {
    let len = this.props.tracks.length
    let index = parseInt(this.props.currentindex, 10) + (val);
    
    if (index >= 0) {
      this.props.changeindex({ index: index + '' })
      let cacheFiles=JSON.parse(localStorage.getItem('cache_files'))
      let url = `${config.apihost}/api/stream/music?encoded_url=${this.props.tracks[index % len]['encoded_url']}&cache=${cacheFiles}`
      this.loadAudio(url)
    }
  }
  
  getdur = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    let str;
    if (seconds < 10)
      str = minutes.toString() + ':0' + seconds.toString();
    else
      str = minutes.toString() + ':' + seconds.toString();
    return str;
  }
  
  setdur = () => {
    if (this.props.audio !== undefined) {
      let duration = Math.floor(this.props.audio.seek((this.props.id)))
      duration = this.getdur(duration);
      let d = this.getdur(Math.floor(this.props.audio.duration(this.props.id)));
      this.refs.timer1.innerHTML = duration;
      this.refs.timer2.innerHTML = d;
    }
  }

  togglerepeat = () => {
    if (!this.props.repeat) {
      this.props.raudio();
      this.props.audio.off('end')
      this.props.audio.on('end', () => {
        this.handlePlay();
      })
    }
    else {
      this.props.raudio();
      this.props.audio.off('end')
      this.props.audio.on('end', () => {
        this.queue(1);
      })
    }
  }
  
  togglevol = () => {
    if (!this.props.mute) {
      this.props.tvol();
      this.props.audio.mute(true)
    }
    else {
      this.props.tvol();
      this.props.audio.mute(false)
    }
  }
  
  render() {
    let style = {}
    let style1 = {}
    if (this.props.id === 0) {
      style = { 'pointerEvents': 'none', 'opacity': ' 0.4' }
    }
    else {
      style = { 'pointerEvents': 'auto', 'opacity': '1.0' }
    }
    return (
      <React.Fragment>
        <div style={style} className="card-panel music-player z-depth-5">
          <div className="control-left">
            <div className="now-playing">

            </div>
          </div>
          <div className="control-middle">
            <div className="play-controls">
              <Next type="prev" click={this.queue} val={-1} />
              {!this.props.playing &&
                <Pbutton
                  id="play"
                  click={this.handlePlay}
                />}
              {this.props.playing &&
                <Pbutton
                  id="pause"
                  click={this.handlePause}
                />}
              <Next type="next" click={this.queue} val={1} />
            </div>
            <div className="inf">
              <p className="play-time" ref={'timer1'}>&nbsp;</p>
              <div id="seek" style={style1}></div>
              <p className="total-time" ref={'timer2'}>&nbsp;</p>
            </div>
          </div>
          <div className="control-right">
            <span className="time" ref={'timer'}></span>
            <div className="right-controls">
              {!this.props.repeat && <i className="material-icons" onClick={this.togglerepeat} style={{ 'color': 'white' }}>repeat</i>}
              {this.props.repeat && <i className="material-icons" onClick={this.togglerepeat} style={{ 'color': 'white' }}>repeat_one</i>}
              {!this.props.mute && <i className="material-icons volcon" onClick={this.togglevol} style={{ 'color': 'white' }}>volume_down</i>}
              {this.props.mute && <i className="material-icons volcon" onClick={this.togglevol} style={{ 'color': 'white' }}>volume_off</i>}
              <div id="vol">
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    audio: state.audio.audio,
    id: state.audio.id,
    repeat: state.audio.repeat,
    playing: state.audio.playing,
    currentindex: state.audiolist.currentindex,
    tracks: state.audiolist.tracks,
    vol: state.audiolist.vol,
    mute: state.audio.mute
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadaudio,
    paudio,
    raudio,
    psaudio,
    loadfun,
    changeindex,
    tvol
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Control);