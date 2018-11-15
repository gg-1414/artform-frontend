import React, { Component } from 'react';
import '../stylesheets/BidList.css'
import '../stylesheets/ArtShow.css'

class BidListItem extends Component {
  render() {
    return (
      <div className="bid-item" >
        <span className="bidder-initial">{this.props.bid.bidder_name.slice(0,1)}</span>
        <span>{this.props.bid.bidder_name} </span>
        <span> ${this.props.bid.bid_amount}</span>
      </div>
    )
  }
}

export default BidListItem;
