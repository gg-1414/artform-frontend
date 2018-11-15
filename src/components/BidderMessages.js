import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../redux/actioncreator'

let messages;

class BidderMessages extends Component {
  componentDidMount() {
    if(!!this.props.currentUser) {
      this.props.getMessages(this.props.currentUser.id)
    }
  }

  parseISODate = (d) => {
    let t = d.split(/\D+/)
    let newDate = new Date(Date.UTC(t[0], --t[1], t[2], t[3], t[4], t[5], t[6]))
    return this.formatDate(this.formatDate(newDate.getUTCMonth() + 1 + '/' + newDate.getUTCDate())) + '/' + newDate.getUTCFullYear()
  }

  formatDate = (num) => {
    return (num < 10 ? '0' : '') + num
  }

  render() {
    console.log('messages:', this.props.messages);
    console.log('user:', this.props.currentUser);
    if(this.props.messages.length) {
      messages = this.props.messages.map(message => {
        return (
          <div key={message.id} className="message-text">
            <p>{this.parseISODate(message.created_at)}</p>
            <p>{message.text}</p>
          </div>
        )
      })
    } else {
      messages = null
    }

    return (
      <div id="bidder-messages">
        <h1>Messages</h1>
        <div id="messages">
          {messages}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    latestAuctionedArt: state.latestAuctionedArt,
    biddings: state.biddings,
    messages: state.messages
  }
}

export default connect(mapStateToProps, { getMessages })(BidderMessages);
