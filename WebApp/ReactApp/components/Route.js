import React from 'react';
import { render } from 'react-dom';
import { Provider, connect  } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import blogReducer from '../reducers/reducers';
import BlogApp from './Blog';
import Twitch from './Twitch';
import SideNavApp from './App';
import injectTapEventPlugin from './react-tap-event-plugin/src/injectTapEventPlugin';

injectTapEventPlugin();

if (typeof window !== 'undefined') {
  window.React = React;
}
  
let store = createStore(blogReducer, window.devToolsExtension ? window.devToolsExtension() : undefined);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={SideNavApp}>
        <Route path="twitch" component={Twitch}/>
        <Route path="blog" component={BlogApp}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react')
);

export default connect()(store);
export default store;
