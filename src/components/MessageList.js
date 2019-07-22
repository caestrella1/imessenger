import React from 'react';

const DUMMY_DATA = [
  {
    senderId: 'person1',
    message: 'Hello world!'
  },
  {
    senderId: 'carlos',
    message: 'Hello world! (2)'
  },
  {
    senderId: 'jack',
    message: 'Testing jack'
  },
  {
    senderId: 'charlie',
    message: 'testing charlie'
  },
];

class MessageList extends React.Component {
  render() {
    return (
      <div className="message-list">
        {DUMMY_DATA.map((message, index) => {
          return (
            <div key={index} className="message">
              <div className="message-username">{message.senderId}</div>
              <div className="message-text">{message.message}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
