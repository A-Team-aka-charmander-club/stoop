import axios from 'axios';

// action constants
const ADD_PHOTO = 'ADD_PHOTO';

const TAKE_PHOTO = 'TAKE_PHOTO';

// action creators
const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    photo,
  };
};

export const takePhoto = (photo) => {
  return {
    type: TAKE_PHOTO,
    photo,
  };
};

// thunks
export const addPhotoThunk = (firebasePhotoId, photoUrl) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/photos/photo`,
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
    case TAKE_PHOTO:
      return action.photo;
    default:
      return state;
  }
}
