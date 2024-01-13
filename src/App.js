import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const WebSocketApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connection, setConnection] = useState(null);
  

  useEffect(() => {
    // WebSocket connection setup
    const wsConnection = io("ws://localhost:8080");

    wsConnection.on("connect", () => {
      console.log('WebSocket connection opened');
    });

      wsConnection.on("packet", ({ type, data }) => {
        const newMessages = [...messages, type];
        setMessages(newMessages);
      });

    wsConnection.onAny((eventName, ...args) => {
      const newMessages = [args[0], ...messages];
      console.log(args);
      setMessages(newMessages);
    });

    wsConnection.on("disconnect", () => {
      console.log('WebSocket connection closed');
    });

    setConnection(wsConnection);

    // Cleanup on component unmount
    return () => {
      wsConnection.close();
    };
  }, [messages]);

  const sendMessage = () => {
    if (connection && inputMessage.trim() !== '') {
      connection.emit(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>WebSocket React App</h1>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message['image']['data_path']}
              <img alt={message['image']['data_path']}
                src={"http://localhost:8080/image/" + message['image']['data_path']} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default WebSocketApp;