const initialState = {
  currentUser: null,
  arts: [],
  currentArt: null
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "LOG_IN_ARTIST":
      localStorage.setItem('token', action.payload.jwt)
      return {...state, currentUser: action.payload}

    case "LOG_IN_BIDDER":
      localStorage.setItem('token', action.payload.jwt)
      return {...state, currentUser: action.payload}

    case "LOG_OUT_USER":
      return {...state, currentUser: null}

    case "FETCH_ARTS":
      return {...state, arts: action.payload}

    case "SET_CURRENT_ART":
      return {...state, currentArt: action.payload}

    default:
      return state
  }
}

export default reducer;
