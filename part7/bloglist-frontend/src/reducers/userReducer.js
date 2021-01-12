import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'INIT':
    case 'LOGOUT':
      return action.data;
    default:
      return state;
  }
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({
        type: 'LOGIN',
        data: user,
      });
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'error'));
    }
  };
};

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  blogService.setToken(null);
  return {
    type: 'LOGOUT',
    data: null,
  };
};

export const initUser = () => {
  const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
  let user = null;
  if (loggedUserJson) {
    user = JSON.parse(loggedUserJson);
    blogService.setToken(user.token);
  }
  return {
    type: 'INIT',
    data: user,
  };
};

export default userReducer;
