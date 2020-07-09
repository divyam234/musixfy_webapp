import React from 'react';
import {render} from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import {createBrowserHistory} from 'history'
import {composeWithDevTools } from 'redux-devtools-extension';
import {routerMiddleware,ConnectedRouter} from 'connected-react-router'
import createRootReducer from './reducers/rootreducer'
import App from './components/App';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
const history = createBrowserHistory()
const store = createStore(createRootReducer(history),compose(composeWithDevTools(
  applyMiddleware(thunk,routerMiddleware(history))
)));
store.subscribe(()=>{
 //console.log(store.getState());
})
const theme = createMuiTheme({
  palette: {
     primary: {
        main: '#1db954',
        light:'#62ec83',
        dark:'#008827'
     },
     secondary: {
       main: '#f44336',
     }, 
  },
  typography:{
    fontFamily:"'Open Sans', sans-serif",
    
    body2:{
      fontFamily:"'Open Sans', sans-serif",
    }
   },
});

    const comp = (
    <Provider store={store}>
    <ConnectedRouter history={history} >
    <MuiThemeProvider theme = { theme }>
    <CssBaseline />
     <App/>
     </MuiThemeProvider>, 
    </ConnectedRouter>
    </Provider>
 );
render(comp,document.getElementById('root'))
serviceWorker.register()