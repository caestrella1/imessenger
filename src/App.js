import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import Navbar from './components/Navbar';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import RoomInfo from './components/RoomInfo';
import NewRoomForm from './components/NewRoomForm';
import './css/styles.css';

import { tokenURL, instanceLocator } from './config';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            room: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            isDark: false
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.getRoomsList = this.getRoomsList.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.markMessageAsRead = this.markMessageAsRead.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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
        if (this.state.room && this.state.room.id === roomId) {return;}

        this.setState({ messages: [] });
        this.currentUser.subscribeToRoomMultipart({
            roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        joinableRooms: this.state.joinableRooms,
                        joinedRooms: this.currentUser.rooms
                    })
                    if (this.state.room &&
                        this.state.room.id === message.room.id) {
                        this.getMessages(this.state.room.id);
                    }
                }
            }
        })
        .then(room => {
            this.setState({room});
            this.getMessages(this.state.room.id);
        })
        .catch(err => console.log("Error subscribing to room", err));
    }

    getMessages(roomId) {
        this.currentUser.fetchMultipartMessages({
            roomId,
            direction: 'older'
        })
        .then(messages => {
            this.setState({
                messages: [...messages]
            })
            let lastMessage = messages[messages.length - 1];
            this.markMessageAsRead(lastMessage.room.id, lastMessage);
        })
        .catch(err => {
            console.log("Error fetching messages:", err);
        })
    }

    markMessageAsRead(roomId, message) {
        if (roomId === message.room.id) {
            this.currentUser.setReadCursor({
                roomId,
                position: message.id
            })
            .catch(err => {
                console.log('Error marking conversation as read', err);
            });
        }
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text, roomId: this.state.room.id
        })
        .then(message => {
            this.markMessageAsRead(message.room.id, message);
            this.getMessages(this.state.room.id);
        })
        .catch(err => {
            console.log('error sending message:', err)
        });
    }

    createRoom(roomName) {
        this.currentUser.createRoom({
            name: roomName
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log("error creating room", err));
    }

    toggleDarkMode() {
        this.setState({
            isDark: !this.state.isDark
        });
    }

    deleteRoom(roomId) {
        this.currentUser.deleteRoom({ roomId })
          .then(() => {
              this.subscribeToRoom(this.currentUser.rooms[0].id);
              console.log(`Deleted room with ID: ${roomId}`)
          })
          .catch(err => {
            console.log(`Error deleted room ${roomId}: ${err}`)
          })
    }

    render() {
        return (
            <div id="app" className={"app " + (this.state.isDark ? "dark" : "light")}>
                <Navbar
                    isDark={this.state.isDark}
                    toggleDarkMode={this.toggleDarkMode}/>
                <RoomList
                    room={this.state.room}
                    subscribeToRoom={this.subscribeToRoom}
                    getRoomsList={this.getRoomsList}
                    rooms={[...this.state.joinedRooms]}/>
                <RoomInfo
                    currentUser={this.currentUser}
                    room={this.state.room}
                    deleteRoom={this.deleteRoom}/>
                <MessageList
                    currentUser={this.currentUser}
                    messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm createRoom={this.createRoom}/>
            </div>
        );
    }
}

export default App;
