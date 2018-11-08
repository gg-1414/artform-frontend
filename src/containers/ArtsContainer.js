import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtCard from '../components/ArtCard'
import '../stylesheets/ArtsContainer.css'
import { fetchArts, removeCurrentArt } from '../redux/actioncreator'

class ArtsContainer extends Component {
  state = {
    showArt: null
  }

  componentDidMount() {
    this.props.fetchArts()
  }

  closeModal = (e) => {
    console.log('e.target: ', e.target.id);
    if(e.target.id === 'art-showpage'){
      this.props.removeCurrentArt()
    }
  }

  render() {
    const artCards = this.props.arts.map(art => <ArtCard artData={art} key={art.id} />)

    const artShowPage = this.props.currentArt !== null ? (
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
            <img src={this.props.currentArt.artist.img_url} />
            <span>{this.props.currentArt.artist.name} </span>
            <span> ${this.props.currentArt.starting_price}</span>
            {/* <ul id="bidders-list"></ul> */}
            <input type="number" placeholder={`$ ${this.props.currentArt.starting_price + 1}`} />
            <button>BID</button>
          </div>
        </div>
      </div>
    ) : null

    console.log('Current Art: ', this.props.currentArt)
    return (
      <div id="arts-container">
        {artCards}
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

export default connect(mapStateToProps, { fetchArts, removeCurrentArt })(ArtsContainer);
