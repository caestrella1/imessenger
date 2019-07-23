import React from 'react';

class RoomList extends React.Component {
    render() {

        const orderedRooms = [...this.props.rooms[0]].sort((a, b) => a.id - b.id);

        return (
            <div className="room-list">
                <ul>
                    <h2 className="room-title">Room List</h2>
                    {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? "active" : "";
                        return (
                            <li key={room.id} className={"room-name " + active}>
                                <a onClick={() => this.props.subscribeToRoom(room.id)}
                                    href="#"> # {room.name} {room.isPrivate ? "(Private)" : ""}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default RoomList;
