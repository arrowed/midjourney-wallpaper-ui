import React, { useEffect, useState } from 'react';


const WebSocketApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // WebSocket connection setup
    var W3CWebSocket = require('websocket').w3cwebsocket;

    var wsConnection = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');

    wsConnection.onopen = () => {
      console.log('WebSocket connection opened');
    };

    wsConnection.onmessage = (event) => {
      const newMessages = [...messages, event.data];
      setMessages(newMessages);
    };

    wsConnection.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setConnection(wsConnection);

    // Cleanup on component unmount
    return () => {
      wsConnection.close();
    };
  }, [messages]);

  const sendMessage = () => {
    if (connection && inputMessage.trim() !== '') {
      connection.send(inputMessage);
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
            <li key={index}>{message}</li>
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