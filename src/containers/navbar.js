import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadsongsnew } from '../actions/index'
import Modal from './settings'
class Navbar extends Component {
  value = null;
  state = {
    show: true
  }
  modal = null;
  componentDidMount() {}
  
  focus = () => {
    this.setState((state, props) => {
      return {
        show: false
      };
    });
    document.removeEventListener('keydown', this.props.keypress)
  }
  
  blur = (e) => {
    e.target.value = ''
    this.setState((state, props) => {
      return {
        show: true
      }
    })
    document.addEventListener('keydown', this.props.keypress)
  }
  
  submit = (event) => {
    event.preventDefault();
    this.props.history.push('/search?q=' + this.value, { tracks: 'hello' })
  }
  render() {
    let styles = { 'backgroundColor': '#1db954', 'zIndex': '103', 'userSelect': 'none' };
    let sty = { 'display': '' };
    let sty1 = { 'width': '40%' };
    if (!this.state.show) {
      sty = { 'display': 'none' }
      sty1 = { 'width': '100%' }
    }
    return (
      <React.Fragment>
        <nav style={styles}>
          <div className="nav-wrapper">
            <a className="brand-logo center" style={sty}>Musixfy</a>
            <ul className="right" style={sty} >
              <i className="material-icons" onClick={(e) => { this.modal.open() }}>settings</i>
            </ul>
            <form onSubmit={this.submit}>
              <div className="input-field" style={sty1}>
                <input style={{ 'position': 'absolute' }} id="search" type="search" onChange={(e) => { this.value = e.target.value }} onBlur={this.blur} onFocus={this.focus} autoComplete="off"></input>
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
        {<Modal id={'settings'} modalcontrol={t => this.modal = t} />}
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    keypress: state.audio.controlfun === null ? {} : state.audio.controlfun.keypress
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadsongsnew,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);