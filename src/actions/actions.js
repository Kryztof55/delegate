import * as actionTypes from "./actionTypes";

const setUsers = (users, index) => {
  return {
    type: actionTypes.SET_USERS_TO_STATE,
    users: [...users],
  };
};

export { setUsers };
