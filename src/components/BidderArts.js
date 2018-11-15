import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../stylesheets/BidderProfileContainer.css'

let arts = null;

class BidderArts extends Component {
  state = {
    bidderArts: []
  }

  componentDidMount() {
    const bidderArts = this.props.arts.filter(art => {
      return art.winner_id === this.props.currentUser.id
    })
    this.setState({ bidderArts: bidderArts })
  }

  render() {
    console.log('arts:', this.state.bidderArts);
    if(this.state.bidderArts.length) {
      arts = this.state.bidderArts.map(art => {
        return (
          <div className="bidder-art-item" key={art.id}>
            <img src={art.img_url} alt={art.title}/>
            <div className="art-info">
              <h5>{art.title}</h5>
              <p>{art.artist.name}</p>
            </div>
          </div>
        )
      })
    }
    return (
      <div id="bidder-arts-container">
        <div id="bidder-arts">
          {arts}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    arts: state.arts
  }
}

export default connect(mapStateToProps)(BidderArts);
