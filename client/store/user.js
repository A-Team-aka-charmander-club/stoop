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
export function createOrFindUserThunk(user) {
  return async (dispatch) => {
    console.log('In the user thunk', user);
    try {
      // `https://trashpandapirates.herokuapp.com/api/users/user`,

      const { data } = await axios.post(
        `http://10.0.0.153:8080/api/users/user`,
        // `https://localhost:8080/api/users/user`
        { user }
      );
      console.log('user from thunk', user);
      console.log('data from thunk', data);
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
