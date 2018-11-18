import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../stylesheets/ArtShow.css'
import BidListItem from './BidListItem'
import { removeCurrentArt, fetchBids, setCurrentArt, fetchArts, removeArtFromArts, setLatestAuctionedArt, removeWinner, fetchUser } from '../redux/actioncreator'

let interval;

class ArtShow extends Component {
  state = {
    currentUser: null,
    bidAmount: 0,
    timeLeft: null
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.fetchUser(localStorage.token)
    }

    fetch(`http://localhost:3000/api/v1/arts/${this.props.currentArt.id}`)
      .then(res => res.json())
      .then(art => {
        this.props.setCurrentArt(art)
        this.props.fetchBids(this.props.currentArt.id)

        if(this.props.currentArt.start_time !== '') {
          this.startTimer(this.props.currentArt.start_time)
        }
      })
  }

  componentWillUnmount() {
    clearInterval(interval)
    if(this.props.winner !== null) {
      const data = {
        winner_id: this.props.winner[0].bidder_id
      }

      fetch(`http://localhost:3000/api/v1/arts/${this.props.currentArt.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
    this.props.fetchArts()
  }

  closeModal = (e) => {
    if(e.target.id === 'art-showpage'){
      this.props.removeCurrentArt()
    }
  }

  getWinner = () => {
    let winner;
    fetch(`http://localhost:3000/api/v1/arts/${this.props.currentArt.id}`)
      .then(res => res.json())
      .then(art => {
        winner = art.biddings.slice(-1)[0]
        this.props.setWinner(winner)
        return art
      }).then(res => {
        return fetch(`http://localhost:3000/api/v1/arts/winner/${this.props.currentArt.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json'
          },
          body: JSON.stringify({ winner_id: winner.bidder_id })
        })
          .then(res => res.json())
          .then(art => {
            console.log(art); // => art obj
          })
      })
  }

  startTimer = (startTime) => {
    console.log('time: ', this.state.timeLeft);
    interval = setInterval(() => {
      console.log('new time: ', this.state.timeLeft);
      if(this.state.timeLeft === 0){
        clearInterval(interval)
        this.getWinner()
        this.props.setLatestAuctionedArt(this.props.currentArt)
        this.props.removeCurrentArt()
      } else {
        const timeNow = Date.now()
        const timeElapsedMS = timeNow - startTime
        const timeElapsedSEC = Math.floor(timeElapsedMS/1000)
        this.setState({ timeLeft: 25 - parseInt(timeElapsedSEC) })
      }
    }, 1000)
  }

  bidAmountChangeHandler = (e) => {
    this.setState({ bidAmount: e.target.value })
  }

  bidClickHandler = (e) => {
    e.preventDefault()
    if(!this.props.bids.length) {
      const data = {
        start_time: Date.now()
      }

      fetch(`http://localhost:3000/api/v1/arts/${this.props.currentArt.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(art => {
        this.startTimer(art.start_time)
        this.props.setCurrentArt(art)
      })
    }

    const data = {
      art_id: this.props.currentArt.id,
      bidder_id: this.props.currentUser.id,
      bid_amount: this.state.bidAmount
    }

    fetch('http://localhost:3000/api/v1/biddings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    .then(res => this.props.fetchBids(this.props.currentArt.id))
  }

  render() {
    // console.log('CURRENT ART?:', this.props.currentArt);
    // console.log("ARTSHOW ARTS: ", this.props.arts);
    console.log('winner from artshow:', this.props.winner);
    let currentArt = this.props.currentArt,
        bids = this.props.bids

    const artCurrentBids = bids.map(bid => <BidListItem bid={bid} key={bid.id} />)

    return (
      <div id="art-showpage" className="modal" onClick={this.closeModal}>
        <div className="modal-content">
          <div id="art-image">
            <img src={currentArt.img_url} alt={currentArt.title} />
          </div>
          <div id="art-description">
            {!!this.state.timeLeft ?
              <div className="auction-state">
                <span>00:00:{this.state.timeLeft < 10 ? `0${this.state.timeLeft}` : this.state.timeLeft }</span>
              </div> :
              <div className="auction-state">Open For Auction</div>
            }
            <h2>{currentArt.title}</h2>
            <h4>by {currentArt.artist.name}</h4>
          </div>
          <div id="auction">
            <h4>BIDDERS</h4>
            <div id="initial-bid">
              <img src={currentArt.artist.img_url} alt={currentArt.artist.name} />
              <span>{currentArt.artist.name} </span>
              <span> ${currentArt.starting_price}</span>
            </div>
            <div id="bid-list">
              {artCurrentBids}
            </div>
            <form id="bid-form" onSubmit={this.bidClickHandler}>
              <input type="number"
                onChange={this.bidAmountChangeHandler}
                placeholder={bids.length ? `$ ${bids[bids.length-1].bid_amount + 1}` : `$ ${currentArt.starting_price + 1}`}
                min={bids.length ? `${bids[bids.length-1].bid_amount + 1}` : `${currentArt.starting_price + 1}`}
              />
              <input type="submit" value="BID" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    currentArt: state.currentArt,
    bids: state.bids,
    winner: state.winner,
    arts: state.arts,
    latestAuctionedArt: state.latestAuctionedArt
  }
}

export default connect(mapStateToProps, { removeCurrentArt, fetchBids, setCurrentArt, fetchArts, removeArtFromArts, setLatestAuctionedArt, removeWinner, fetchUser })(ArtShow);
