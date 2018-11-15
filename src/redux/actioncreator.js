export const setCurrentUserType = (userType) => {
  return dispatch => {
    dispatch({
      type: "SET_CURRENT_USER_TYPE", payload: userType
    })
  }
}

export const handleLogin = (typeOfUser, email, password) => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/users_auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({typeOf: typeOfUser, email: email, password: password})
    })
    .then(res => res.json())
    .then(user => dispatch({
      type: "LOG_IN_USER", payload: user
    }))
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
  }
}

export const removeCurrentUser = () => {
  return dispatch => {
    dispatch({
      type: "LOG_OUT_USER"
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



export const fetchAllBids = () => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/biddings')
      .then(res => res.json())
      .then(biddings => {
        dispatch({
          type: "FETCH_ALL_BIDS", payload: biddings
        })
      })
  }
}

export const fetchBids = (artId) => {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/arts/${artId}`)
      .then(res => res.json())
      .then(art => {
        dispatch({
          type: "FETCH_BIDS", payload: art.biddings
        })
      })
  }
}

export const setLatestAuctionedArt = (art) => {
  return dispatch => {
    dispatch({
      type: "SET_LATEST_AUCTIONED_ART", payload: art
    })
  }
}

// export const getArtBiddings = (artId) => {
//   return dispatch => {
//     fetch()
//   }
// }

export const removeArtFromArts = (arts, auctionedArt) => {
 return dispatch => {
   const updatedArts = arts.filter(art => {
     return art.id !== auctionedArt.id
   })
   dispatch({
     type: "REMOVE_ART", payload: updatedArts
   })
 }
}

export const removeWinner = () => {
  return dispatch => {
    dispatch({
      type: "REMOVE_WINNER"
    })
  }
}

export const setBiddings = (artId) => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/biddings')
      .then(res => res.json())
      .then(biddings => {
        const artBiddings = biddings.filter(bidding => {
          return bidding.art_id === artId
        })
        dispatch({
          type: "SET_BIDDINGS", payload: artBiddings
        })
      })
  }
}

export const getMessages = (bidderId) => {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/bidders/${bidderId}`)
      .then(res => res.json())
      .then(bidder => {
        return dispatch({
          type: "GET_MESSAGES", payload: bidder.messages
        })
      })
  }
}
