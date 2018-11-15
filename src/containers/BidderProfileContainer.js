import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import BidderArts from '../components/BidderArts'
import BidderMessages from '../components/BidderMessages'
import '../stylesheets/BidderProfileContainer.css'
import { fetchUser, fetchArts } from '../redux/actioncreator'

class BidderProfileContainer extends Component {
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.fetchUser(localStorage.token)
    }
    this.props.fetchArts()
  }

  render() {
    return (
      <div id="bidder-profile">
        <BidderArts />
        <BidderMessages />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    latestAuctionedArt: state.latestAuctionedArt,
    biddings: state.biddings,
    messages: state.messages
  }
}

export default connect(mapStateToProps, { fetchUser, fetchArts })(BidderProfileContainer);
