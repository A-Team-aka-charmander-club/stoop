import axios from 'axios';
import user from './user';
import { firebase } from '../../src/firebase/config';
import { removeCoordinate } from './coordinates';

const CREATE_POST = 'CREATE_POST';

const DELETE_POST = 'DELETE_POST';

const EDIT_POST = 'EDIT_POST';

const GET_POST = 'GET_POST';

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

export const editPost = (post) => {
  return {
    type: EDIT_POST,
    post,
  };
};

export const getPost = (singlePost) => {
  return {
    type: GET_POST,
    singlePost,
  };
};

//thunk

export const createPostThunk = (post) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;
      const { data } = await axios.post(
<<<<<<< HEAD
        `http://localhost:8080/api/posts/post`,
=======
        `http://192.168.1.152:8080/api/posts/post`,
>>>>>>> 9cd67d795a3f274e435aea50baa2a7acc7eab64f
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

export const destroyPost = (postId, navigation, userId) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;

      const { data } = await axios.delete(
<<<<<<< HEAD
        `http://localhost:8080/api/posts/${postId}/${userId}`,
=======
        `http://192.168.1.152:8080/api/posts/${postId}/${userId}`,
>>>>>>> 9cd67d795a3f274e435aea50baa2a7acc7eab64f
        {
          headers: { authorization: user.uid },
        }
      );

      if (data) {
        navigation.navigate('Home');
        dispatch(deletePost(data));
        dispatch(removeCoordinate(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePost = (post, userId, postId) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;
      const { data } = await axios.put(
<<<<<<< HEAD
        `http://localhost:8080/api/posts/${postId}/${userId}`,
=======
        `http://192.168.1.152:8080/api/posts/${postId}/${userId}`,
>>>>>>> 9cd67d795a3f274e435aea50baa2a7acc7eab64f
        post,
        {
          headers: { authorization: user.uid },
        }
      );
      dispatch(editPost(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initState = {};

export default function postReducer(state = initState, action) {
  switch (action.type) {
    case GET_POST:
      return action.singlePost;
    case CREATE_POST:
      return action.post;
    case EDIT_POST:
      return action.post;
    case DELETE_POST:
      return initState;
    default:
      return state;
  }
}
