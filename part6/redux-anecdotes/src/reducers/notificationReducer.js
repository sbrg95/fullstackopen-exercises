const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let lastTimeoutID = null;

export const setNotification = (notification, time = 5) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });

    if (lastTimeoutID) {
      clearTimeout(lastTimeoutID);
    }

    lastTimeoutID = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, time * 1000);
  };
};

export default notificationReducer;
