import React from 'react';

class RoomList extends React.Component {

    constructor() {
        super();

        this.getRoomsList = this.getRoomsList.bind(this);
        this.getRoomCount = this.getRoomCount.bind(this);
    }

    getRoomCount() {
        if (this.props.rooms) {
            return this.props.rooms.length +
                (this.props.rooms.length > 1 || this.props.rooms.length === 0 ?
                ' Rooms' : ' Room');
        }
        return '0 Rooms';
    }

    getRoomsList() {
        if (this.props.room && this.props.rooms) {
            return (
                this.props.rooms.map(room => {
                    const active = this.props.room.id === room.id ? "active" : "";
                    const isPrivate = room.isPrivate ? "Private" : "Public";
                    const showUnread = room.unreadCount > 0 ? "show" : "";
                    const lastMessage = new Date(room.lastMessageAt);

                    return (
                        <li key={room.id} className={"room " + active}>
                            <button onClick={() => this.props.subscribeToRoom(room.id)}>
                                <div className="room-meta">
                                    <span className="room-is-private">
                                        {isPrivate}
                                    </span>
                                    <span className="room-name">
                                        {room.name}
                                    </span>
                                    <span className="room-last">
                                        { timeDifference(new Date(), lastMessage) }
                                    </span>
                                </div>
                                <div className={"room-unread " + showUnread}>
                                    {room.unreadCount}
                                </div>
                            </button>
                        </li>
                    );
                })
            );
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div className="rooms">
                <div className="room-header">
                    <div>
                        <h1 className="room-title">Room List</h1>
                        <span className="room-count">{this.getRoomCount()}</span>
                    </div>
                </div>
                <ul className="room-list">
                    {this.getRoomsList()}
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
