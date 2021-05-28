import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import photo from './photo';
import post from './post';
import comments from './comments';

import tags from './tag';

import coordinates from './coordinates';

const reducer = combineReducers({
  user,
  photo,
  post,
  coordinates,
  tags,
  comments,
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, middleware);

export default store;
