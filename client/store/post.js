import axios from 'axios';
import user from './user';
import { firebase } from '../../src/firebase/config';

//action constants
const CREATE_POST = 'CREATE_POST';

// action creators
export const createPost = (post) => {
  return {
    type: CREATE_POST,
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
        `http://192.168.1.152:8080/api/posts/post`,
>>>>>>> c499f0d68116acedb3ea2758701781e9df734826
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
    case CREATE_POST:
      return action.post;
    default:
      return state;
  }
}
