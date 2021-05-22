import axios from 'axios';
import user from './user';
// import post from './post';
import { SECRET } from '@env';
import { firebase } from '../../src/firebase/config';

// ACTION CONSTANTS
const GET_COMMENTS = 'GET_COMMENTS';

const ADD_COMMENT = 'ADD_COMMENT';

const DELETE_COMMENT = 'DELETE_COMMENT';

// ACTION CREATORS
export const addComment = (comment) => {
  console.log('ACTION CREATOR COMMENT: ', comment);
  return {
    type: ADD_COMMENT,
    comment,
  };
};

export const getComment = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

export const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment,
  };
};

// THUNKS

export const createComment = (comment, postId, userId) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;

      const { data } = await axios.post(
        `http://localhost:8080/api/comments/${postId}/${userId}`,
        { comment },
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

export const grabComment = (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/comments/${postId}`
      );
      dispatch(getComment(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyComment = (userId, commentId) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;
      const { data } = await axios.delete(
        `http://localhost:8080/api/comments/${userId}/${commentId}`,
        {
          headers: { authorization: user.uid },
        }
      );
      if (data) {
        dispatch(deleteComment(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

//REDUCERS

let initState = [];

export default function commentReducer(state = initState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.comment];
    case GET_COMMENTS:
      return action.comments;
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.comment.id);
    default:
      return state;
  }
}
