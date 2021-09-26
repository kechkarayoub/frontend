import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(promiseMiddleware));
export default store;