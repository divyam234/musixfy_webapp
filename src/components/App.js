import React, { Component } from 'react';
import "nouislider/distribute/nouislider.min.css"
import "../css/index.css"
import "../css/control.css"
import Controls from './controls';
import List from './musiclist'
import Navbar from '../containers/navbar'
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changebackg,changeCacheState } from '../actions/index'
import Login from './login'

class App extends Component {
  componentDidMount() {
    this.props.changeCacheState({})
    this.props.changebackg({})
    window.onkeydown = (e) => {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="content" style={{ 'backgroundImage': this.props.color }}></div>
        <div className="top-container">
          <Navbar {...this.props} />
          <Route exact path='/' render={() => (null)} />
          <Route path='/search' component={List} />
          <Route path='/login' component={Login} />
          <Controls />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    color: state.theme.background,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changebackg,
    changeCacheState
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));