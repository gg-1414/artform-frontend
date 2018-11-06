import React, { Component } from 'react';
import ArtCard from '../components/ArtCard'
import '../stylesheets/ArtsContainer.css'

class ArtsContainer extends Component {
  state = {
    arts: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/arts')
      .then(res => res.json())
      .then(json => {
        this.setState({ arts: json })
      })
  }

  render() {
    const artCards = this.state.arts.map(art => <ArtCard artData={art} key={art.id} />)
    // console.log('State: ', this.state.arts)
    return (
      <div id="arts-container">
        {artCards}
      </div>
    )
  }
}

export default ArtsContainer;
