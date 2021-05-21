import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import photo from './photo';
import post from './post';
import comments from './comments';
import profile from './profile';

import tags from './tag';

import coordinates from './coordinates';

const reducer = combineReducers({
  user,
  photo,
  post,
  coordinates,
  tags,
  comments,
  profile,
});

//createLogger({ collapsed: true }
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, middleware);

export default store;
