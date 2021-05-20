import axios from 'axios';
import user from './user';
// import post from './post';
import { firebase } from '../../src/firebase/config';

// ACTION CONSTANTS
const GET_COMMENTS = 'GET_COMMENTS';

const ADD_COMMENT = 'ADD_COMMENT';

// ACTION CREATORS
export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

// THUNKS

export const createComment = (comment, postId, userId) => {
  return async (dispatch) => {
    console.log('CREATE COMMENT THUNK');
    try {
      const user = firebase.auth().currentUser;

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
