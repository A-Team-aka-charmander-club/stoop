import axios from 'axios';
import user from './user';
import { firebase } from '../../src/firebase/config';

const GET_POSTS = 'GET_POSTS';

export const getPosts = (post) => {
  return {
    type: GET_POSTS,
    post,
  };
};

export const grabPosts = (post) => {
  return async (dispatch) => {
    console.log('in getPosts thunk');
    try {
      const { data } = await axios.get(
        `http://10.0.0.153:8080/api/posts/post`,
        {
          headers: {
            authorization: user,
          },
        }
      );
      dispatch(getPosts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

let initState = [];

export default function profileReducer(state = initState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.post;
    default:
      return state;
  }
}
