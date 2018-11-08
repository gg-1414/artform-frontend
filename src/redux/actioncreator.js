export const setCurrentUserType = (userType) => {
  return dispatch => {
    dispatch({
      type: "SET_CURRENT_USER_TYPE", payload: userType
    })
  }
}

export const handleArtistLogin = (email, password) => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/artists_auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then(res => res.json())
    .then(artist => dispatch({
      type: "LOG_IN_ARTIST", payload: artist
    }))
  }
}

export const handleBidderLogin = (email, password) => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/bidders_auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then(res => res.json())
    .then(bidder => dispatch({
      type: "LOG_IN_BIDDER", payload: bidder
    }))
  }
}

export const fetchUser = (token) => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/current_bidder', {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(bidder => {
        dispatch({
          type: "GET_USER", payload: bidder
        })
      })
      // .catch(error => {
      //   console.log(error);
      //   fetch('http://localhost:3000/api/v1/current_artist', {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json; charset=utf-8",
      //       Accept: "application/json",
      //       Authorization: token
      //     }
      //   })
      //     .then(res => res.json())
      //     .then(artist => {
      //       dispatch({
      //         type: "GET_USER", payload: artist
      //       })
      //     })
      // })
  }
}

export const removeCurrentUser = () => {
  return dispatch => {
    dispatch({
      type: "LOG_OUT_USER", payload: null
    })
  }
}

export const fetchArts = () => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/arts')
    .then(res => res.json())
    .then(arts => dispatch({
      type: "FETCH_ARTS", payload: arts
    }))
  }
}

export const setCurrentArt = (art) => {
  return dispatch => {
    dispatch({
      type: "SET_CURRENT_ART", payload: art
    })
  }
}

export const removeCurrentArt = () => {
  return dispatch => {
    dispatch({
      type: "REMOVE_CURRENT_ART"
    })
  }
}

export const fetchBids = () => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/biddings')
      .then(res => res.json())
      .then(biddings => {
        dispatch({
          type: "FETCH_BIDS", payload: biddings
        })
      })
  }
}
