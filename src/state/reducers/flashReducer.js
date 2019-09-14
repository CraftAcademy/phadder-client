const flashReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "DISPATCH_MESSAGE":
      return {
        ...state,
        message: { ...action.payload, display: true },

      };
    case "CLEAR_MESSAGE":
      return {
        message: { display: false }
      };
    default:
      return state;
  }
};

export default flashReducer;
