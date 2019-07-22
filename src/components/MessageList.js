import React from 'react';

const DUMMY_DATA = [
    {
        senderId: 'person1',
        text: 'Hello world!'
    },
    {
        senderId: 'carlos',
        text: 'Hello world! (2)'
    },
    {
        senderId: 'jack',
        text: 'Testing jack'
    },
    {
        senderId: 'charlie',
        text: 'testing charlie'
    },
];

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {DUMMY_DATA.map((message, index) => {
                    return (
                        <div key={index} className="message">
                            <div className="message-username">
                                {message.senderId}
                            </div>
                            <div className="message-text">
                                {message.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default MessageList;
