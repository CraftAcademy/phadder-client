
const dispatchMessage = (message, type) => {
  return async dispatch => {
    dispatch({ type: 'DISPATCH_MESSAGE', payload: { message: message, type: type } })
    clearMessage()
  }
}

const clearMessage = id => {
  return async dispatch => {
    dispatch({ type: "CLEAR_MESSAGE" });
  };
};

export { dispatchMessage, clearMessage }