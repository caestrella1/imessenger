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
            user: null,
            room: null,
            rooms: null,
            messages: [],
            usersWhoAreTyping: [],
            isDark: false
        };

        /* Room methods */
        this.createRoom = this.createRoom.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.getSortedRooms = this.getSortedRooms.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);

        /* Message methods */
        this.markMessageAsRead = this.markMessageAsRead.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        /* Option methods */
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: "carlos",
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenURL
            })
        });

        chatManager.connect()
        .then(user => {
            this.setState({ user });
            if (this.state.user) {
                this.getSortedRooms();
                this.subscribeToRoom(this.state.rooms[0].id);
            }
        })
        .catch(err => console.log("error connecting to current user", err));
    }

    /* Room methods */

    createRoom(roomName) {
        this.state.user.createRoom({
            name: roomName
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log("error creating room", err));
    }

    subscribeToRoom(roomId) {
        if (this.state.room && this.state.room.id === roomId) {return;}

        this.setState({ messages: [] });
        let requestedRoom = true;

        this.state.user.subscribeToRoomMultipart({
            roomId,
            hooks: {
                onMessage: message => {
                    if ((requestedRoom && roomId === message.room.id) ||
                        (!requestedRoom && this.state.room.id === message.room.id)) {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                            this.markMessageAsRead(requestedRoom ?
                                roomId : this.state.room.id, message);
                    }
                    this.getSortedRooms();
                },
                onUserStartedTyping: user => {
                    this.setState({
                        usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                    })
                },
                onUserStoppedTyping: user => {
                    this.setState({
                        usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                            username => username !== user.name
                        ),
                    })
                }
            }
        })
        .then(room => {
            this.setState({room});
            requestedRoom = false;
        })
        .catch(err => console.log("Error subscribing to room", err));
    }

    getSortedRooms() {
        let sorted = this.state.user.rooms.sort((a, b) =>
            new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
        );
        this.setState({
            rooms: sorted
        });
    }

    deleteRoom(roomId) {
        this.state.user.deleteRoom({ roomId })
          .then(() => {
              this.subscribeToRoom(this.state.user.rooms[0].id);
              console.log(`Deleted room with ID: ${roomId}`)
          })
          .catch(err => {
            console.log(`Error deleted room ${roomId}: ${err}`)
          })
    }

    sendTypingEvent() {
        this.state.user
            .isTypingIn({ roomId: this.state.room.id })
            .catch(error => console.error('error', error))
    }

    /* Message methods */

    markMessageAsRead(roomId, message) {
        if (roomId === message.room.id) {
            this.state.user.setReadCursor({
                roomId,
                position: message.id
            });
        }
    }

    sendMessage(text) {
        this.state.user.sendMessage({
            text, roomId: this.state.room.id
        });
    }

    /* Option methods */

    toggleDarkMode() {
        this.setState({
            isDark: !this.state.isDark
        });
    }

    render() {
        if (!this.state.user) return null;
        else {
            return (
                <div id="app" className={"app " + (this.state.isDark ? "dark" : "light")}>
                    <Navbar
                        toggleDarkMode={this.toggleDarkMode}/>
                    <RoomList
                        room={this.state.room}
                        rooms={this.state.rooms}
                        subscribeToRoom={this.subscribeToRoom}/>
                    <RoomInfo
                        user={this.state.user}
                        room={this.state.room}
                        deleteRoom={this.deleteRoom}/>
                    <MessageList
                        user={this.state.user}
                        room={this.state.room}
                        messages={this.state.messages}
                        usersWhoAreTyping={this.state.usersWhoAreTyping}/>
                    <SendMessageForm
                        currentRoom={this.state.room}
                        sendMessage={this.sendMessage}
                        onChange={this.sendTypingEvent}/>
                    <NewRoomForm createRoom={this.createRoom}/>
                </div>
            );
        }
    }
}

export default App;
