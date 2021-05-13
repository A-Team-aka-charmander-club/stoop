import axios from 'axios';

const ADD_PHOTO = 'ADD_PHOTO';

const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    photo,
  };
};

export const addPhotoThunk = (firebasePhotoId, photoUrl) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        //`https://trashpandapirates.herokuapp.com/api/photos/photo`,
        `https://localhost:8080/api/users/user`,
        {
          firebasePhotoId,
          photoUrl,
        }
      );
      dispatch(addPhoto(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_PHOTO:
      return action.photo;
    default:
      return state;
  }
}
