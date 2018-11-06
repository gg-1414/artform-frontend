const initialState = {
  currentUser: null
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "LOG_IN_ARTIST":
      localStorage.setItem('token', action.payload.jwt)
      return {...state, currentUser: action.payload}

    case "LOG_IN_BIDDER":
      localStorage.setItem('token', action.payload.jwt)
      return {...state, currentUser: action.payload}

    default:
      return state
  }
}

export default reducer;
