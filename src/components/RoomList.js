import React from 'react';

class RoomList extends React.Component {
    render() {

        const orderedRooms = [...this.props.rooms[0]].sort((a, b) => a.id - b.id);

        return (
            <div className="rooms">
                <div className="room-title">
                    <h2>Room List</h2>
                </div>
                <ul className="room-list">
                    {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? "active" : "";
                        return (
                            <li key={room.id} className={"room-name " + active}>
                                <button onClick={() => this.props.subscribeToRoom(room.id)}> # {room.name} {room.isPrivate ? "(Private)" : ""}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default RoomList;
