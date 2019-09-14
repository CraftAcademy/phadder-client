const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        first_name: "",
        last_name: "",
        email: "", 
        role: 'end_user'
      },
    },
  },
}

export default initialState