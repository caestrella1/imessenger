import React from 'react';
import EmojiAware from 'emoji-aware';

class Message extends React.Component {

    formatText(text) {
        if (isOnlyEmoji(text)) {
            return (
                <span className="message-emoji">{text}</span>
            );
        }
        else {
            return (
                <div className="message-bubble">
                    {splitEmojiFromText(text)}
                </div>
            );
        }
    }

    render() {
        const alignment = this.props.user.name ===
            this.props.username ? "sent" : "received";

        return (
            <div className={"message " + alignment}>
                <div className="message-username">
                    {this.props.username}
                </div>
                {this.formatText(this.props.text)}
                <div className="message-timestamp">
                    Sent {this.props.sent}
                </div>
            </div>
        );
    }
}

function splitEmojiFromText(str) {
    let buffer = [];
    let chars = EmojiAware.split(str);

    for (let c of chars) {
        if (isEmoji(c)) buffer.push(<span className="inline-emoji">{c}</span>);
        else buffer.push(c);
    }
    return buffer;
}

function isEmoji(str) {
    return EmojiAware.withoutEmoji(str).length === 0;
}

function isOnlyEmoji(str) {
    return EmojiAware.withoutEmoji(str).length === 0;
}

export default Message;
