import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUser } = useParams();
  const [messages, setMessages] = useState([{ text: "hello" }]);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUser });
  }, []);

  return (
    <div className="w-1/2 mx-auto border border-red-500 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-500">CHAT BOX</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
                Gautam
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className=" p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          className=" flex-1 border border-red-600 text-white rounded p-2"
          type="text"
        />
        <button className=" btn btn-secondary">SEND</button>
      </div>
    </div>
  );
};

export default Chat;
