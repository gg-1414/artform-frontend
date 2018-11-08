import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../stylesheets/ArtShow.css'
import BidListItem from './BidListItem'
import { removeCurrentArt, fetchBids } from '../redux/actioncreator'

class ArtShow extends Component {
  state = {
    currentUser: null,
    bidAmount: 0
  }

  componentDidMount() {
    this.props.fetchBids(this.props.currentArt.id)
  }

  closeModal = (e) => {
    if(e.target.id === 'art-showpage'){
      this.props.removeCurrentArt()
    }
  }

  bidAmountChangeHandler = (e) => {
    this.setState({ bidAmount: e.target.value })
  }

  bidClickHandler = (e) => {
    e.preventDefault()
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
    // console.log('currentUser!:', this.props.currentUser);
    // console.log('currentArt!:', this.props.currentArt);
    console.log('bidAmount!:', this.state.bidAmount);
    // console.log('bids!!: ', this.props.bids);
    let currentArt = this.props.currentArt,
        bids = this.props.bids

    const artCurrentBids =  bids.map(bid => <BidListItem bid={bid} key={bid.id} />)

    return (
      <div id="art-showpage" className="modal" onClick={this.closeModal}>
        <div className="modal-content">
          <div id="art-image">
            <img src={currentArt.img_url} alt={currentArt.title} />
          </div>
          <div id="art-description">
            <h2>{currentArt.title}</h2>
            <h4>by {currentArt.artist.name}</h4> {/* <Link to='/artist/profile' />*/}
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
    bids: state.bids
  }
}

export default connect(mapStateToProps, { removeCurrentArt, fetchBids })(ArtShow);
