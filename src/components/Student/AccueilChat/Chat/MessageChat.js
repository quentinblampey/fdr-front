import React, { Component } from 'react';
import './MessageChat.scss';

class MessageChat extends Component {
  updateScroll() {
    const element = document.getElementById('chatbox');
    element.scrollTop = element.scrollHeight;
  }

  render() {
    let messageBox;
    if (this.props.color === 0) {
      messageBox = (
        <div>
          <div className="text-box-blue">
            <p>
              {' '}
              {this.props.message}
              {' '}
            </p>
          </div>
        </div>
      );
    } else {
      messageBox = (
        <div>
          <div className="text-box-gray">
            <p>
              {' '}
              {this.props.message}
              {' '}
            </p>
          </div>
        </div>
      );
    }
    return <div className="message">{messageBox}</div>;
  }
}

export default MessageChat;
