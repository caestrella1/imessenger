import React from 'react';

class NewRoomForm extends React.Component {

    constructor() {
        super();
        this.state = {
            roomName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleChange(e) {
        this.setState({
            roomName: e.target.value
        });
    }

    handleInput() {
        if (document.getElementById('room-input').value.length === 0)
            document.getElementById('add-room').disabled = true;
        else document.getElementById('add-room').disabled = false;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({roomName: ""});
        document.getElementById('add-room').disabled = true;
    }

    render() {
        return (

                <form className="new-room" onSubmit={this.handleSubmit}>
                    <input
                        id="room-input"
                        type="text"
                        value={this.state.roomName}
                        placeholder="New Room"
                        onInput={this.handleInput}
                        onChange={this.handleChange}/>
                    <button id="add-room" type="submit" disabled>
                        <span className="plus">+</span>
                    </button>
                </form>

        );
    }
}

export default NewRoomForm;
