import React from 'react';

class RoomInfo extends React.Component {

    getUsers() {
        let users = Object.values(this.props.room.userStore.users);
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
                    <h1 className="room-title">{this.props.room.name}</h1>
                    <span className="user-list">{ this.getUsers() }</span>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default RoomInfo;
