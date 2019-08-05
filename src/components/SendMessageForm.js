import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

class SendMessageForm extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            isEmojiPickerVisible: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
        this.addEmojiToMessage = this.addEmojiToMessage.bind(this);
        this.handleMessageFocus = this.handleMessageFocus.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('send');
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ""
        });
    }

    handleMessageFocus() {
        this.setState({
            isEmojiPickerVisible: false
        });
    }

    toggleEmojiPicker(e) {
        e.preventDefault();
        this.setState({
            isEmojiPickerVisible: !this.state.isEmojiPickerVisible
        });
    }

    addEmojiToMessage(emoji) {
        let newMessage = this.state.message + emoji.native;
        this.setState({
            message: newMessage
        });
    }

    render() {
        return (
            <div className="send-message-container">
                <div id="emoji-picker"
                    className={this.state.isEmojiPickerVisible ? "show" : ""}>
                    <Picker
                        native={true}
                        onSelect={this.addEmojiToMessage}
                        title="Choose an emoji"
                        color="var(--highlight)"
                        emojiSize={32}
                        emoji="smile"/>
                </div>

                <button id="toggle-emoji" onClick={this.toggleEmojiPicker}>
                    <FontAwesomeIcon icon={faSmile}/>
                </button>

                <form onSubmit={this.handleSubmit} className="send-message">
                    <input
                        onChange={this.handleChange}
                        onFocus={this.handleMessageFocus}
                        value={this.state.message}
                        placeholder="Send Message"
                        type="text"/>
                </form>

            </div>
        );
    }
}

export default SendMessageForm;
