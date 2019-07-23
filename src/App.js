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
            messages: []
        };
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
            console.log("Connected as user", currentUser);
            currentUser.subscribeToRoomMultipart({
                roomId: currentUser.rooms[0].id,
                hooks: {
                    onMessage: message => {
                        console.log(message);
                        this.setState({
                            messages: [...this.state.messages, message]
                        });
                    }
                }
            })
        });
    }

    render() {
        console.log("messages", this.state.messages);
        return (
            <div className="app">
                <RoomList/>
                <MessageList messages={this.state.messages}/>
                <SendMessageForm/>
                <NewRoomForm/>
            </div>
        );
    }
}

export default App;
