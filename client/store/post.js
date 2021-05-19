import axios from 'axios';
import user from './user';
import { firebase } from '../../src/firebase/config';

//action constants
const CREATE_POST = 'CREATE_POST';

<<<<<<< HEAD
const DELETE_POST = 'DELETE_POST';

const EDIT_POST = 'EDIT_POST';
=======
const GET_POST = 'GET_POST';

>>>>>>> 8a1686d5108ff392c9e5d9da4d9c82a7696ac722
// action creators
export const createPost = (post) => {
  return {
    type: CREATE_POST,
    post,
  };
};

export const getPost = (singlePost) => {
  //console.log('in the store:', post);
  return {
    type: GET_POST,
    singlePost,
  };
};

//thunk

export const createPostThunk = (post) => {
  return async (dispatch) => {
    try {
      console.log('IN POST THUNK');
      const user = firebase.auth().currentUser;
      const { data } = await axios.post(
        `http://10.0.0.153:8080/api/posts/post`,

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
        `http://localhost:8080/api/posts/${postId}/${userId}`,
        {
          headers: { authorization: user.uid },
        }
      );

      if (data) {
        navigation.navigate('Home');
        dispatch(deletePost(data));
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
        `http://localhost:8080/api/posts/${postId}/${userId}`,
        post,
        {
          headers: { authorization: user.uid },
        }
      );
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
    case DELETE_POST:
      return initState;
    default:
      return state;
  }
}
