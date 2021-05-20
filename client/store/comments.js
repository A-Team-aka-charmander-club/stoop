import axios from 'axios';
import user from './user';
// import post from './post';
import { firebase } from '../../src/firebase/config';

// ACTION CONSTANTS
const GET_COMMENTS = 'GET_COMMENTS';

const ADD_COMMENT = 'ADD_COMMENT';

<<<<<<< HEAD
// ACTION CREATORS

// THUNKS

export const createComment = (comment, postId, userId) => {
  return async (dispatch) => {
    console.log('CREATE COMMENT THUNK');
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/comments/${postId}/${userId}`,
        comment,
        {
          headers: { authorization: user.uid },
        }
      );
      dispatch(addComment(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//REDUCERS

let initState = {};

export default function commentReducer(state = initState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return action.comment;
    default:
      return state;
  }
}
=======
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
>>>>>>> main
