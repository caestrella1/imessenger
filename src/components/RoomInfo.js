import React from 'react';

class RoomInfo extends React.Component {

    getUsers() {
        let users = Object.values(this.props.room.users);
        let replace = this.props.currentUser.name;
        let regex = new RegExp(replace, 'g');

        return users.map((user) => {
            return user.name;
        }).join(', ').replace(regex, 'You').replace(/, ([^,]+)$/, ' and $1');
    }

    render() {
        if (this.props.room) {
            return (
                <div className="room-info">
                    <div className="room-name-users">
                        <h1 className="room-title">{this.props.room.name}</h1>
                        <span className="user-list">{ this.getUsers() }</span>
                    </div>
                    <div className="room-actions">
                        <button
                            className="room-delete"
                            type="submit"
                            onClick={() => this.props.deleteRoom(this.props.room.id)}>
                            Delete Room
                        </button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="room-info">
                    <div className="room-name-users">
                        <h1 className="room-title">No Room Selected</h1>
                        <span className="user-list">Please select a room to get started</span>
                    </div>
                </div>
            );
        }
    }
}

export default RoomInfo;
