const initialState = {
  role: "",
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        first_name: "",
        last_name: "",
        email: "", 
      },
    },
  },
}

export default initialState