import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

class MessageList extends React.Component {

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight >= node.scrollHeight;
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            currentUser={this.props.currentUser}
                            username={message.senderId}
                            text={message.parts[0].payload.content}
                            sent={message.createdAt}
                        />
                    );
                })}
            </div>
        );
    }
}

export default MessageList;
