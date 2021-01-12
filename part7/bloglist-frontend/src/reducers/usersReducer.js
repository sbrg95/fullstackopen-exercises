import usersServices from '../services/users';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    default:
      return state;
  }
};

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersServices.getAll();

    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export default usersReducer;
