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
const history = createBrowserHistory()
const store = createStore(createRootReducer(history),compose(composeWithDevTools(
  applyMiddleware(thunk,routerMiddleware(history))
)));
store.subscribe(()=>{
 //console.log(store.getState());
})
    const comp = (
    <Provider store={store}>
    <ConnectedRouter history={history} >
     <App/>
    </ConnectedRouter>
    </Provider>
 );
render(comp,document.getElementById('root'))
serviceWorker.register()