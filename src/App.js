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
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        };
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
            this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
            })
            .catch(err => console.log("get joinable rooms error", err));

            console.log("Connected as user", currentUser);
            this.currentUser.subscribeToRoomMultipart({
                roomId: currentUser.rooms[0].id,
                hooks: {
                    onMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        });
                    }
                }
            })
        })
        .catch(err => console.log("error connecting to current user", err));
    }


    sendMessage(text) {
        this.currentUser.sendMessage({
            text, roomId: this.currentUser.rooms[0].id
        });
    }

    render() {
        return (
            <div className="app">
                <nav className="navbar"></nav>
                <RoomList rooms={[...this.state.joinableRooms, this.state.joinedRooms]}/>
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm/>
            </div>
        );
    }
}

export default App;
