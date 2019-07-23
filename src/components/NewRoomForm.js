import React from 'react';

class NewRoomForm extends React.Component {

    constructor() {
        super();
        this.state = {
            roomName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            roomName: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({roomName: ""});
    }

    render() {
        return (
            <div className="new-room">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.roomName}
                        placeholder="New Room"
                        onChange={this.handleChange}/>
                    <button id="add-room" type="submit">+</button>
                </form>
            </div>
        );
    }
}

export default NewRoomForm;
