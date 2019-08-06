import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

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
                            username={message.sender.name}
                            text={message.parts[0].payload.content}
                            sent={message.createdAt}
                        />
                    );
                })}
                <TypingIndicator
                    usersWhoAreTyping={this.props.usersWhoAreTyping}/>
            </div>
        );
    }
}

export default MessageList;
