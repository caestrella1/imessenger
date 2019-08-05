import React from 'react';

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
                    {[...text].map((char, i) => {
                        if (isEmoji(char)) {
                            return (
                                <span className="inline-emoji" key={i}>{char}</span>
                            );
                        }
                        else {
                            return char;
                        }
                    })}
                </div>
            );
        }
    }

    render() {
        const alignment = this.props.currentUser.name ===
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

function isEmoji(str) {
    const ranges = [
        '\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]',
    ].join('|');

    const removeEmoji = str => str.replace(new RegExp(ranges, 'g'), '');
    return str.length !== removeEmoji(str).length;
}

function isOnlyEmoji(str) {
    const ranges = [
        '\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]',
    ].join('|');

    const removeEmoji = str => str.replace(new RegExp(ranges, 'g'), '');
    return removeEmoji(str).length === 0;
}

export default Message;
