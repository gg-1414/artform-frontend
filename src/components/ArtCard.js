import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentArt } from '../redux/actioncreator'
import '../stylesheets/ArtCard.css'

class ArtCard extends Component {
  state = {
    timeLeft: 0
    // minutesLeft: 0,
    // secondsLeft: 0
  }

  // componentDidMount() {
    // this.setState({
    //   secondsLeft: this.props.artData.start_seconds
    // })
    // if(this.props.artData.start_time !== 0){
    //   const countDown = setInterval(function() {
    //   	let timeNow = parseInt(Date.now()) - parseInt(this.props.artData.start_time)
    //   	let secondsElapsed = Math.floor(timeNow/1000)
    //   	let timeLeft = 60 - secondsElapsed
    //
    //     timeLeft === 0 ? clearInterval(countDown) : this.setState({
    //       timeLeft: timeLeft
    //     })
    //
    //   }, 1000)
    // }
  // }

  // componentWillUnmount() {
  //
  // }

  handleArtClick = (e) => {
    this.props.setCurrentArt(this.props.artData)
  }

  // if (artData.startTime !== '0:0'){
  //  this.setState({ timeLeft:  })
  // }
  // <div className={artData.startTime !== 0 ? }
  //   onClick={this.handleArtClick}>

  render() {
    // if(this.state.timeLeft === 0) {
    //   clearInterval()
    // }

    console.log('time left: ', this.state.timeLeft);
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
