import React, { Component } from 'react';
import '../stylesheets/ArtistProfileContainer.css'
import ArtistProfile from '../components/ArtistProfile'
import ArtistArtContainer from '../containers/ArtistArtContainer'

class ArtistProfileContainer extends Component {
  state = {
    currentTab: 'Profile'
  }

  render() {
    return (
      <div>
        <nav id="artist-profile-nav">
          <span
            className={this.state.currentTab === 'Profile' ? 'activeTab' : null}
          >Profile</span>
          <span
            className={this.state.currentTab === 'Art' ? 'activeTab' : null}
          >Art</span>
        </nav>
        {this.state.currentTab === 'Profile' ?
          <ArtistProfile /> : <ArtistArtContainer />
        }
      </div>
    )
  }
}

export default ArtistProfileContainer;
