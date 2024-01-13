import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const WebSocketApp = () => {
  const [focussed, setFocusImages] = useState([]);
  const [other, setOtherImages] = useState([]);
  const [connection, setConnection] = useState(null); //eslint-disable-line
  
  useEffect(() => {
    // WebSocket connection setup
    const wsConnection = io(`ws://${window.location.host}`);

    wsConnection.on("connect", () => {
      console.log('WebSocket connection opened');
    });

    wsConnection.onAny((eventName, ...args) => {
      if (args[0]['image']['classification'] === 'widescreen') {
        const updatedWidescreens = [args[0], ...focussed].slice(0, 50);
        setFocusImages(updatedWidescreens);
      } else {
        const updatedOtherResolutions = [args[0], ...other].slice(0, 50);
        setOtherImages(updatedOtherResolutions);
      }
    });

    wsConnection.on("disconnect", () => {
      console.log('WebSocket connection closed');
    });

    setConnection(wsConnection);

    // Cleanup on component unmount
    return () => {
      wsConnection.close();
    };
  }, [focussed, other]);

  const setHero = (image) => {
      const updatedWidescreens = [image, ...focussed];
      setFocusImages(updatedWidescreens);
  }

  return (
    <div>
      <ul>
        <li> 
          {//hero
          focussed[0] && 
              <img alt={ focussed[0]['image']['data_path']}
                    src={"/image/" + focussed[0]['image']['data_path']} 
                    max-height= "100%"
                    min-width= "100%"
                    width="1000px"
                    height="auto"
                    loading="lazy"
                    />
          }
        </li>

        { other.slice(0, 10).map((message, index) => (
            <li>
              <img alt={message['image']['data_path']}
                src={"/image/" + message['image']['data_path']} 
                loading="lazy"
                onClick={() => setHero(message)}
                />
            </li>
          ))}
        </ul>
      </div>
  );
};

export default WebSocketApp;