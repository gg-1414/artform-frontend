import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtCard from '../components/ArtCard'
import ArtShow from '../components/ArtShow'
import '../stylesheets/ArtsContainer.css'
import { fetchArts, removeWinner, removeArtFromArts, setBiddings, fetchUser } from '../redux/actioncreator'

class ArtsContainer extends Component {
  state = {
    showArt: null,
    winner: null
  }

  componentDidMount() {
    this.props.fetchArts()
  }

  postWinnerMessage = (winner) => {
    fetch(`https://artform-backend.herokuapp.com/api/v1/arts/${this.props.latestAuctionedArt.id}`)
      .then(res => res.json())
      .then(art => {
        const bidders = art.biddings
        let uniqBidders = [];
        bidders.filter((item) => {
          let i = uniqBidders.findIndex(x => x.bidder_id === item.bidder_id)
          if(i <= -1) {
            uniqBidders.push({ bidder_id: item.bidder_id, bidder_name: item.bidder_name })
          }
        })

        uniqBidders.forEach(bidder => {
          const data = {
            art_id: this.props.latestAuctionedArt.id,
            bidder_id: bidder.bidder_id,
            winner_id: winner.bidder_id,
            text: `${winner.bidder_name === bidder.bidder_name ?
              'You have' : `${winner.bidder_name} has`
            } won '${this.props.latestAuctionedArt.title}' at $${winner.bid_amount}`
          }

          fetch('https://artform-backend.herokuapp.com/api/v1/messages', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(message => console.log(message))
        })
      })
  }

  setWinner = (bidder) => {
    this.setState({ winner: bidder })
  }

  componentDidUpdate() {
    console.log('state.winner:', this.state.winner);
    if(this.state.winner !== null) {
      // this.setState({ winner: this.props.winner })
      this.postWinnerMessage(this.state.winner)
      // this.props.removeArtFromArts(this.props.arts, this.props.latestAuctionedArt)
      this.props.setBiddings(this.props.latestAuctionedArt.id)
      if(localStorage.getItem('token')) {
        this.props.fetchUser(localStorage.token)
      }
      // this.props.removeCurrentArt()
      this.setState({ winner: null })
    }
    // this.props.fetchArts()
  }

  render() {
    console.log('currentUser:', this.props.currentUser);
    const arts = this.props.arts.filter(art => {
      return (art.winner_id === null)
    })
    const artCards = arts.map(art => <ArtCard artData={art} key={art.id} />)
    return (
      <div id="arts-container">
        {artCards}
        {this.props.currentArt !== null && this.props.currentUser !== null ?
          <ArtShow setWinner={this.setWinner}/> : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    authCurrentUser: state.authCurrentUser,
    arts: state.arts,
    currentArt: state.currentArt,
    winner: state.winner,
    latestAuctionedArt: state.latestAuctionedArt
  }
}

export default connect(mapStateToProps, { fetchArts, removeWinner, removeArtFromArts, setBiddings, fetchUser })(ArtsContainer);
