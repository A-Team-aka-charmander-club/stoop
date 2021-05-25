import axios from 'axios';
import { SECRET } from '@env';
import { firebase } from '../../src/firebase/config';

// ACTION CONSTANTS
const CREATE_USER = 'CREATE_USER';

const LOGOUT_USER = 'LOGOUT_USER';

//ACTION CREATORS
function createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    user: {},
  };
}
// THUNK
export function createOrFindUserThunk(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `https://trashpandapirates.herokuapp.com/api/users/user`,
        {
          user,
        },
        {
          headers: { authorization: SECRET },
        }
      );
      dispatch(createUser(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserPostsThunk(userId) {
  return async (dispatch) => {
    const user = firebase.auth().currentUser;
    try {
      const { data } = await axios.get(
        `https://trashpandapirates.herokuapp.com/api/users/user/${userId}`,
        {
          headers: { authorization: user.uid },
        }
      );
      dispatch(createUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    case LOGOUT_USER:
      return action.user;
    default:
      return state;
  }
}
