import React from 'react';

class RoomInfo extends React.Component {

    getUsers() {
        let result = '';
        let index = 0;
        let users = this.props.room.userStore.users;
        let count = Object.keys(users).length;
        for (let [key, user] of Object.entries(users)) {
            result += user.name;

            index++;
            if (index === count - 1) {
                result += ' and ';
            }
            else if (index !== count - 1 && index !== count) {
                result += ', ';
            }
        }
        return result;
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
