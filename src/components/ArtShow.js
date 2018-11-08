import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../stylesheets/ArtShow.css'
import BidListItem from './BidListItem'
import { removeCurrentArt, fetchBids } from '../redux/actioncreator'

class ArtShow extends Component {
  state = {
    currentUser: null,
    bidAmount: 0
    // currentBid: 0
  }

  componentDidMount() {
    this.props.fetchBids()
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
      bidder_id: this.state.currentUser.id,
      bid_amount: this.state.bidAmount
    }

    fetch('http://localhost:3000/api/v1/biddings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    .then(res => this.props.fetchBids())
  }

  render() {
    console.log('currentUser!:', this.props.currentUser);
    // console.log('currentArt!:', this.props.currentArt);
    // console.log('bidAmount!:', this.state.bidAmount);
    console.log('allBids!: ', this.props.allBids);
    const artCurrentBids = []
    this.props.allBids.forEach(bid => {
      if(bid.art_id === this.props.currentArt.id){
        artCurrentBids.push(<BidListItem bid={bid}/>)
      }
    })

    return (
      <div id="art-showpage" className="modal" onClick={this.closeModal}>
        <div className="modal-content">
          <div id="art-image">
            <img src={this.props.currentArt.img_url} alt={this.props.currentArt.title} />
          </div>
          <div id="art-description">
            <h2>{this.props.currentArt.title}</h2>
            <h4>by {this.props.currentArt.artist.name}</h4> {/* <Link to='/artist/profile' />*/}
          </div>
          <div id="auction">
            <h4>BIDDERS</h4>
            <div id="initial-bid">
              <img src={this.props.currentArt.artist.img_url} alt={this.props.currentArt.artist.name} />
              <span>{this.props.currentArt.artist.name} </span>
              <span> ${this.props.currentArt.starting_price}</span>
            </div>
            <div id="bid-list">
              {artCurrentBids}
            </div>
            <form id="bid-form" onSubmit={this.bidClickHandler}>
              <input type="number" onChange={this.bidAmountChangeHandler} placeholder={`$ ${this.state.currentBid + 1}`} />
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
    allBids: state.allBids
  }
}

export default connect(mapStateToProps, { removeCurrentArt, fetchBids })(ArtShow);
