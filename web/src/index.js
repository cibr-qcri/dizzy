// React
import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { BrowserRouter } from 'react-router-dom';

// Axios
import axios from 'axios';

// Redux
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';

// Redux-Thunk
import thunk from 'redux-thunk';

// Analytics
import AnalyticsProvider from './components/Analytics';

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
      <BrowserRouter>
        <AnalyticsProvider devOptions={{ logToTracker: true }}>
          <App />
        </AnalyticsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
