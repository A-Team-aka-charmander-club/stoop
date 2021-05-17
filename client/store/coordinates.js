import axios from 'axios';

import { firebase } from '../../src/firebase/config';

const GET_COORDINATES = 'GET_COORDINATES';

const getCoordinates = (coordinates) => {
  return {
    type: GET_COORDINATES,
    coordinates,
  };
};

export const getCoordinatesThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        // `https://trashpandapirates.herokuapp.com/api/photos/photo`,
        // 'http://localhost:8080/api/photos/photo',
        //'http://192.168.1.152:8080/api/photos/photo',
        //anna's ip address: 192.168.1.152
        `http://110.0.0.153:8080/api/maps/coordinates`
      );
      dispatch(getCoordinates(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_COORDINATES:
      return action.coordinates;
    default:
      return state;
  }
}
