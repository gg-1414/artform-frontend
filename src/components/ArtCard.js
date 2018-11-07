import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentArt } from '../redux/actioncreator'
import '../stylesheets/ArtCard.css'

class ArtCard extends Component {

  handleArtClick = (e) => {
    this.props.setCurrentArt(this.props.artData)
  }

  render() {
    return (
      <div className="art-card" onClick={this.handleArtClick}>
        <img src={this.props.artData.img_url} alt={this.props.artData.title}/>
      </div>
    )
  }
}

export default connect(null, { setCurrentArt })(ArtCard);
