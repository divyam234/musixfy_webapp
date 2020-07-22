import React, {Suspense, lazy,useEffect} from 'react';
import "nouislider/distribute/nouislider.min.css"
import "../css/index.css"
import "../css/control.css"
import Navbar from '../containers/navbar'
import Controls from './controls'
import { Route, withRouter,Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changebackg,changeCacheState } from '../actions/index'

const App =props=> {
  
   useEffect(()=> {
    props.changeCacheState({})
    props.changebackg({})
    window.onkeydown = (e) => {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    }
  })

const List = lazy(() => import('./musiclist'));

    return (
      <React.Fragment>
        <div className="content" style={{ 'backgroundImage':props.color }}></div>
        <div className="top-container">
          <Navbar {...props} />
          <Suspense fallback={null}>
          <Switch>
          <Route exact path='/' element={null} />
          <Route path='/search' component={List} />
          </Switch>
          </Suspense>
          <Controls />
        </div>
      </React.Fragment>
    );
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