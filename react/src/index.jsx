import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './app'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import 'antd/dist/antd.css'
import '../../assets/stylesheets/application.scss'
import 'react-toastify/dist/ReactToastify.css'
import { mainReducer } from './reducers'

const store = createStore(mainReducer, composeWithDevTools())

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('appDiv')
)
