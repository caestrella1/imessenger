import React from 'react';

function Message(props) {
    const alignment = props.currentUser.id === props.username ? "sent" : "received";

    return (
        <div className={"message " + alignment}>
            <div className="message-username">
                {props.username}
            </div>
            <div className="message-bubble">
                {props.text}
            </div>
            <div className="message-timestamp">
                Sent {props.sent}
            </div>
        </div>
    );
}

export default Message;
