import axios from 'axios';

const GET_COORDINATES = 'GET_COORDINATES';

const REMOVE_COORDINATE = 'REMOVE_COORDINATE';

const getCoordinates = (coordinates) => {
  return {
    type: GET_COORDINATES,
    coordinates,
  };
};

export const removeCoordinate = (coordinate) => {
  return {
    type: REMOVE_COORDINATE,
    coordinate,
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
        `http://10.0.0.153:8080/api/maps/coordinates`
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
    case REMOVE_COORDINATE:
      return state.filter(
        (coordinate) => coordinate.id !== action.coordinate.id
      );
    default:
      return state;
  }
}
