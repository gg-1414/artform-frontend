import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtCard from '../components/ArtCard'
import ArtShow from '../components/ArtShow'
import '../stylesheets/ArtsContainer.css'
import { fetchArts } from '../redux/actioncreator'

class ArtsContainer extends Component {
  state = {
    showArt: null
  }

  componentDidMount() {
    console.log('MOUNTEDDDDDD');
    this.props.fetchArts()
  }

  render() {
    const arts = this.props.arts.filter(art => {
      return art.winner_id === null
    })
    console.log('WINNER!: ', this.props.winner);
    // console.log('arts: ', arts);
    // const artCards = arts.map(art => <ArtCard artData={art} key={art.id} />)
    const artCards = arts.map(art => <ArtCard artData={art} key={art.id} />)

    console.log('Current Art: ', this.props.currentArt)
    console.log('currentUser: ', this.props.currentUser);
    return (
      <div id="arts-container">
        {artCards}
        {this.props.currentArt !== null && this.props.currentUser !== null ?
          <ArtShow /> : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    authCurrentUser: state.authCurrentUser,
    arts: state.arts,
    currentArt: state.currentArt,
    winner: state.winner
  }
}

export default connect(mapStateToProps, { fetchArts })(ArtsContainer);
