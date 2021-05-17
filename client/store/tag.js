import axios from 'axios';

import { firebase } from '../../src/firebase/config';

const ADD_TAGS = 'ADD_TAGS';

export const addTags = (tags) => {
  return {
    type: ADD_TAGS,
    tags,
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case ADD_TAGS:
      return [...action.tags];
    default:
      return state;
  }
}
