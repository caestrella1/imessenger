import React from 'react';

class RoomList extends React.Component {

    getRoomCount() {
        let rooms = this.props.rooms[0];
        return rooms.length  + (rooms.length > 1 || rooms.length === 0 ? ' Rooms' : ' Room');
    }

    render() {

        const orderedRooms = [...this.props.rooms[0]].sort((a, b) => a.id - b.id);

        return (
            <div className="rooms">
                <div className="room-header">
                    <h1 className="room-title">Room List</h1>
                    <span className="room-count">{this.getRoomCount()}</span>
                </div>
                <ul className="room-list">
                    {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? "active" : "";
                        const isPrivate = room.isPrivate ? "Private" : "Public";
                        const showUnread = room.unreadCount > 0 ? "show" : "";
                        const lastMessage = new Date(room.lastMessageAt);

                        return (
                            <li key={room.id} className={"room-name " + active}>
                                <button onClick={() => this.props.subscribeToRoom(room.id)}>
                                    <span className="is-private">{isPrivate}</span>
                                    {room.name}
                                    <span className={"unread-messages " + showUnread}>
                                        {room.unreadCount}
                                    </span>
                                    <span className="last-message">
                                        { timeDifference(new Date(), lastMessage) }
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

function timeDifference(current, previous) {
    var minute = 60 * 1000;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var year = day * 365;

    var elapsed = current - previous;
    var resultString;

    if (isNaN(previous)) {
        return 'No messages';
    }
    else if (elapsed < minute) {
        resultString = 'Just now';
    }
    else if (elapsed < hour) {
        let num = Math.round(elapsed/minute);
        (num > 1) ? resultString = num + ' minutes ago' : resultString = num + ' minute ago';
    }
    else if (elapsed < day) {
        let num = Math.round(elapsed/hour);
        num > 1 ? resultString = num + ' hours ago' : resultString = num + ' hour ago';
    }
    else if (elapsed < month) {
        let num = Math.round(elapsed/day);
        num > 1 ? resultString = num + ' days ago' : resultString = num + ' day ago';
    }
    else if (elapsed < year) {
        let num = Math.round(elapsed/month);
        num > 1 ? resultString = num + ' months ago' : resultString = num + ' month ago';
    }
    else {
        let num = Math.round(elapsed/year);
        num > 1 ? resultString = num + ' years ago' : resultString = num + ' year ago';
    }

    return resultString;
}

export default RoomList;
