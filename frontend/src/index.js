import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from "redux-thunk"
import {Router, Route, IndexRoute, Link, IndexLink, hashHistory} from "react-router"
import registerServiceWorker from './registerServiceWorker';
import reducer from "./reducer"
import './index.css';

import HomeContainer from "./Home/Home";
import AppLayoutContainer from "./AppLayout/AppLayout";
import TargetsContainer from "./Targets/Targets";
import SingleTargetContainer from "./SingleTarget/SingleTarget";
import CreateTargetContainer from "./CreateTarget/CreateTarget";

let store=Redux.createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

ReactDOM.render(<ReactRedux.Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={AppLayoutContainer}>
      <IndexRoute component={HomeContainer}/>
      <Route path="/summary" component={TargetsContainer}/>
      <Route path="/target/:id" component={SingleTargetContainer}/>
      <Route path="/createtarget" component={CreateTargetContainer}/>
    </Route>
  </Router>
</ReactRedux.Provider>
  , document.getElementById('root'));
registerServiceWorker();
