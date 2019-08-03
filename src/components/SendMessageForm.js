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
            <form onSubmit={this.handleSubmit} className="send-message">
                <div id="emoji-picker"
                    className={this.state.isEmojiPickerVisible ? "show" : ""}>
                    <Picker
                        native={true}
                        onSelect={this.addEmojiToMessage}
                        title="Choose an emoji"
                        emoji="smile"/>
                </div>

                <button id="toggle-emoji" onClick={this.toggleEmojiPicker}>
                    <FontAwesomeIcon icon={faSmile}/>
                </button>

                <input
                    id="send-message"
                    onChange={this.handleChange}
                    onFocus={this.handleMessageFocus}
                    value={this.state.message}
                    placeholder="Send Message"
                    type="text"/>
            </form>
        );
    }
}

export default SendMessageForm;
