import axios from 'axios';
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
export function createOrFindUserThunk(firebaseUserId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `https://trashpandapirates.herokuapp.com/api/users/user`,
        {
          firebaseUserId,
        }
      );
      dispatch(createUser(data));
    } catch (err) {
      console.log(err);
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
