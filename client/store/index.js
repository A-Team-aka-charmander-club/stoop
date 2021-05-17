import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import photo from './photo';
import post from './post';

import tags from './tag';

import coordinates from './coordinates';

const reducer = combineReducers({ user, photo, post, coordinates, tags });
<<<<<<< HEAD

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
=======
//createLogger({ collapsed: true }
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware));
>>>>>>> c499f0d68116acedb3ea2758701781e9df734826
const store = createStore(reducer, middleware);

export default store;
