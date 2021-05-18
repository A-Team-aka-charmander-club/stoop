import axios from 'axios';
import user from './user';
import { firebase } from '../../src/firebase/config';

//action constants
const CREATE_POST = 'CREATE_POST';

const DELETE_POST = 'DELETE_POST';
// action creators
export const createPost = (post) => {
  return {
    type: CREATE_POST,
    post,
  };
};

export const deletePost = (post) => {
  return {
    type: DELETE_POST,
    post,
  };
};
//thunk

export const createPostThunk = (post) => {
  return async (dispatch) => {
    try {
      console.log('IN POST THUNK');
      const user = firebase.auth().currentUser;
      const { data } = await axios.post(
<<<<<<< HEAD
        `http://localhost:8080/api/posts/post`,
=======
        `http://192.168.1.6:8080/api/posts/post`,
>>>>>>> 1482f201041cc082172e1200c443f0ced054fca8
        post,
        {
          headers: { authorization: user.uid },
        }
      );
      dispatch(createPost(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyPost = (postId, history) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;

      const { data } = await axios.delete(
        `http://localhost:8080/api/posts/post/${postId}`,
        {
          headers: { authorization: user.uid },
        }
      );
      dispatch(deletePost(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initState = {};

export default function postReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_POST:
      return action.post;
    case DELETE_POST:
      return state.filter((post) => post.id !== action.post.id);
    default:
      return state;
  }
}
