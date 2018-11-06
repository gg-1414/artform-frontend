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
