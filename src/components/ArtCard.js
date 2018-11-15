import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentArt } from '../redux/actioncreator'
import '../stylesheets/ArtCard.css'

class ArtCard extends Component {
  state = {
    timeLeft: 0
  }

  handleArtClick = (e) => {
    this.props.setCurrentArt(this.props.artData)
  }

  render() {
    return (
      <div
        className={this.state.timeLeft === 0 ? "art-card" : "art-card auction"}
        onClick={this.handleArtClick}
      >
        <img src={this.props.artData.img_url} alt={this.props.artData.title}/>
        {this.state.timeLeft === 0 ? null : <span>00:{this.state.timeLeft}</span>}
      </div>
    )
  }
}

export default connect(null, { setCurrentArt })(ArtCard);
