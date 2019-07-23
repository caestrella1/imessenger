import React from 'react';

class SendMessageForm extends React.Component {

    constructor() {
        super();
        this.state = {
            message: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.message);
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Send Message"
                    type="text"/>
            </form>
        );
    }
}

export default SendMessageForm;
