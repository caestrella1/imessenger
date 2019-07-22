import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import './css/styles.css';

import { tokenURL, instanceLocator } from './config';

class App extends React.Component {

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
            currentUser.subscribeToRoom({
                roomId: "21709592",
                hooks: {
                    onNewMessage: message => {
                        console.log('Message: ', message.text);
                    }
                }
            })
        });
    }

    render() {
        return (
            <div className="app">
                <RoomList/>
                <MessageList/>
                <SendMessageForm/>
                <NewRoomForm/>
            </div>
        );
    }
}

export default App;
