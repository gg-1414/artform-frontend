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

  // artData.startTime => 1:00
  // if (artData.startTime !== 0:00){
  //  this.setState({ timeLeft:  })
  // }
  // <div className={artData.startTime !== 0 ? }
  //   onClick={this.handleArtClick}>

  render() {
    return (
      <div className="art-card" onClick={this.handleArtClick}>
        <img src={this.props.artData.img_url} alt={this.props.artData.title}/>
      </div>
    )
  }
}

export default connect(null, { setCurrentArt })(ArtCard);
