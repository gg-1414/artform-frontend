const initialState = {
  currentUserType: null,
  currentUser: null,
  authCurrentUser: null,
  arts: [],
  currentArt: null,
  allBids: []
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_TYPE":
      return {...state, currentUserType: action.payload}

    case "LOG_IN_ARTIST":
      localStorage.setItem('token', action.payload.jwt)
      return {...state, currentUser: action.payload}

    case "LOG_IN_BIDDER":
      localStorage.setItem('token', action.payload.jwt)
      return {...state, currentUser: action.payload}

    case "GET_USER":
    console.log(action.payload);
      return {...state, authCurrentUser: action.payload, currentUser: action.payload}

    case "LOG_OUT_USER":
      localStorage.removeItem('token')
      return {...state, currentUser: null, authCurrentUser: null}

    case "FETCH_ARTS":
      return {...state, arts: action.payload}

    case "SET_CURRENT_ART":
      return {...state, currentArt: action.payload}

    case "REMOVE_CURRENT_ART":
      return {...state, currentArt: null}

    case "FETCH_BIDS":
      return {...state, allBids: action.payload}

    default:
      return state
  }
}

export default reducer;
