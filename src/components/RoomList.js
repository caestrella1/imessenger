import React from 'react';

class RoomList extends React.Component {
    render() {
        return (
            <div className="room-list">
                <ul>
                    <h2 className="room-title">Room List</h2>
                    {this.props.rooms[0].map(room => {
                        return (
                            <li key={room.id} className="room-name">
                                <a href="#"> # {room.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default RoomList;
