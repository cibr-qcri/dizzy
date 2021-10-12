// React
import React from 'react';
import ReactDOM from 'react-dom';

// Axios
import axios from 'axios';

// Redux
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

// Redux-Thunk
import thunk from 'redux-thunk';

// Mocks
//import "./mocks";

// Reducers
import authReducer from './store/reducers/auth';
import dialogReducer from './store/reducers/dialog';
import searchReducer from './store/reducers/search';
import statsReducer from './store/reducers/stats';
import themeReducer from './store/reducers/theme';
import toastReducer from './store/reducers/toast';
import userReducer from './store/reducers/user';

// App
import App from './components/App';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = 'https://dizzy.cibr.qcri.org/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:5000/api/v1';
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const rootReducer = combineReducers({
  auth: authReducer,
  dialog: dialogReducer,
  search: searchReducer,
  stats: statsReducer,
  theme: themeReducer,
  toast: toastReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
