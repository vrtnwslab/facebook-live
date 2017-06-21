import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from 'reducers'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Header from 'components/Header/Header'
import Home from 'components/Home/Home'
import NewSession from 'components/NewSession/NewSession'
import Session from 'components/Session/Session'

import './index.scss'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

if (module.hot) {
  module.hot.accept()
}

const middlewares = [promise(), thunk]

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

const store = createStore(reducer, {}, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : (value) => value
))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/new' component={NewSession} />
          <Route path='/session' component={Session} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
