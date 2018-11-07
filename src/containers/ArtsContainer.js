import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtCard from '../components/ArtCard'
import '../stylesheets/ArtsContainer.css'
import { fetchArts } from '../redux/actioncreator'

class ArtsContainer extends Component {
  state = {
    showArt: null
  }

  componentDidMount() {
    this.props.fetchArts()
  }


  render() {
    const artCards = this.props.arts.map(art => <ArtCard artData={art} key={art.id} />)

    const artShowPage = this.props.currentArt !== null ? (
      <div id="art-showpage" className="modal" >
        <div className="modal-content">
          <div id="art-image">
            <img src={this.props.currentArt.img_url} alt={this.props.currentArt.title} />
          </div>
          <div id="art-description">
            <h2>{this.props.currentArt.title}</h2>
            <h4>by {this.props.currentArt.artist}</h4>
          </div>
          <div id="auction">
            <h4>BIDDERS</h4>
          </div>
        </div>
      </div>
    ) : null

    console.log('Current Art: ', this.props.currentArt)
    return (
      <div id="arts-container">
        {artCards}
        {/*this.props.currentArt !== null ? artShowPage : null*/}
        {artShowPage}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    arts: state.arts,
    currentArt: state.currentArt
  }
}

export default connect(mapStateToProps, { fetchArts })(ArtsContainer);
