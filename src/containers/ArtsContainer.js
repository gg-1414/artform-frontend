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
    this.props.fetchArts()
  }

  render() {
    const artCards = this.props.arts.map(art => <ArtCard artData={art} key={art.id} />)

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
    currentArt: state.currentArt
  }
}

export default connect(mapStateToProps, { fetchArts })(ArtsContainer);
