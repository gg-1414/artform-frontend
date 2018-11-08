import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import rootReducer from './reducers/rootReducer'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux/reducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, applyMiddleware(thunk))
// console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </Provider>,
   document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
