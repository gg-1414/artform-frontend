import React, { Component } from 'react';
import '../stylesheets/BidList.css'
import '../stylesheets/ArtShow.css'

class BidListItem extends Component {
  render() {
    return (
      <div className="bid-item" key={this.props.bid.id}>
        <span className="bidder-initial">{this.props.bid.bidder.slice(0,1)}</span>
        <span>{this.props.bid.bidder} </span>
        <span> ${this.props.bid.bid_amount}</span>
      </div>
    )
  }
}

export default BidListItem;
