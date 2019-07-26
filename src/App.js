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
            roomId: null,
            currentRoom: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            isDark: false
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.getRoomsList = this.getRoomsList.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.getCurrentRoom = this.getCurrentRoom.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
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
        let lastRoom = this.state.currentRoom;
        this.setState({ messages: [] });
        this.currentUser.subscribeToRoomMultipart({
            roomId,
            hooks: {
                onMessage: message => {
                    console.log('New message in ', message.room.name);
                    if (message.room.id === this.state.roomId) {
                        this.setState({
                            messages: [...this.state.messages, message]
                        });
                    }
                    else {
                        this.setState({
                            messages: [...this.state.messages]
                        });
                    }
                }
            }
        })
        .then(room => {
            this.setState({
                roomId: room.id,
                currentRoom: room
            })

            this.getRoomsList();
            this.getCurrentRoom();
        })
        .catch(err => console.log("Error subscribing to room", err));
    }

    getCurrentRoom() {
        let room = null;
        if (this.state.roomId) {
            room = this.state.joinedRooms.find(x => x.id === this.state.roomId);
            this.setState({
                currentRoom: room
            });
        }
    }


    sendMessage(text) {
        this.currentUser.sendMessage({
            text, roomId: this.state.roomId
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
                    roomId={this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, this.state.joinedRooms]}/>
                <RoomInfo
                    currentUser={this.currentUser}
                    room={this.state.currentRoom}
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
