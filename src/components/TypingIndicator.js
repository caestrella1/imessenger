import React from 'react';

class TypingIndicator extends React.Component {
    constructor() {
        super();

        this.getTypingList = this.getTypingList.bind(this);
    }

    getTypingList() {
        let typingString = "";
        if (this.props.usersWhoAreTyping) {
            typingString = this.props.usersWhoAreTyping.map(user => user).join(', ')
            .replace(/, ([^,]+)$/, ' and $1');
            if (this.props.usersWhoAreTyping.length > 1) typingString += " are typing...";
            else typingString += " is typing...";
        }
        return typingString;
    }

    render() {
        if (this.props.usersWhoAreTyping.length > 0) {
            return (
                <div id="type-bubble" className="message">
                    <div className="user-typing">
                        {this.getTypingList()}
                    </div>
                </div>
            )
        }
        else return null;
    }
}

export default TypingIndicator;
