const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
    case 'REMOVE_MOTIFICATION':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (message, type, time = 5) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_MOTIFICATION',
        data: null,
      });
    }, time * 1000);
  };
};

export default notificationReducer;
