import axios from 'axios';
import user from './user';
import { firebase } from '../../src/firebase/config';

//action constants
const CREATE_POST = 'CREATE_POST';

const GET_POST = 'GET_POST';

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
        `http://localhost:8080/api/posts/post`,

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

let initState = {};

export default function postReducer(state = initState, action) {
  switch (action.type) {
    case GET_POST:
      return action.singlePost;
    case CREATE_POST:
      return action.post;
    default:
      return state;
  }
}
