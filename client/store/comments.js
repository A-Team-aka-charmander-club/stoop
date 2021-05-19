import axios from 'axios';
import user from './user';
// import post from './post';
import { firebase } from '../../src/firebase/config';

// ACTION CONSTANTS
const GET_COMMENTS = 'GET_COMMENTS';

const ADD_COMMENT = 'ADD_COMMENT';

const DELETE_COMMENT = 'DELETE_COMMENT';

const EDIT_COMMENT = 'EDIT COMMENT';

// ACTION CREATORS

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

// THUNKS

//REDUCERS
