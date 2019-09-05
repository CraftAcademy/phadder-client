import initialState from "../initialState";

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_ROLE":
      return {
        ...state,
        role: action.payload
      };
    default:
      return state;
  }
}

export default roleReducer;