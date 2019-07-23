import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import './css/styles.css';

import { tokenURL, instanceLocator } from './config';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.getRoomsList = this.getRoomsList.bind(this);
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'carlos',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenURL
            })
        });

        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser;
            this.getRoomsList();
            this.subscribeToRoom(this.currentUser.rooms[0].id);
        })
        .catch(err => console.log("error connecting to current user", err));
    }

    getRoomsList() {
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
        })
        .catch(err => console.log("get joinable rooms error", err));
    }

    subscribeToRoom(roomId) {
        this.setState({ messages: [] });
        this.currentUser.subscribeToRoomMultipart({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    });
                }
            }
        })
        .then(room => {
            this.setState({
                roomId: room.id
            })
            this.getRoomsList();
        })
        .catch(err => console.log("Error subscribing to room", err));
    }


    sendMessage(text) {
        this.currentUser.sendMessage({
            text, roomId: this.state.roomId
        });
    }

    render() {
        return (
            <div className="app">
                <nav className="navbar"></nav>
                <RoomList
                    roomId={this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, this.state.joinedRooms]}/>
                <MessageList
                    currentUser={this.currentUser}
                    messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm/>
            </div>
        );
    }
}

export default App;
