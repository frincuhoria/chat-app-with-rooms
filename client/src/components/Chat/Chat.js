import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {useSearchParams} from 'react-router-dom';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:4000';

    useEffect(() => {
        const name = searchParams.get("name")
        const room = searchParams.get("room")

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT,searchParams]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages,message]);
        })
    },[messages]);

    const sendMessage = (event) => {

        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message,messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;