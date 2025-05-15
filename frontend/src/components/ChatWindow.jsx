import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoChatSelected from './NoChatSelected'; // Assuming it's imported properly

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/message/${selectedUser._id}`,
          { withCredentials: true }
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5001/api/message/send/${selectedUser._id}`,
        { message: text },
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6 bg-[#1a1a1a] text-white">
      {selectedUser ? (
        <>
          {/* Chat Header */}
          <h2 className="text-xl font-semibold mb-4 text-yellow-500">
            Chat with {selectedUser.fullName || selectedUser.email}
          </h2>

          {/* Message Box */}
          <div className="flex-1 border border-gray-700 p-4 rounded-lg mb-4 overflow-y-auto bg-[#121212]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 px-3 py-2 rounded-lg max-w-[75%] ${
                  msg.fromSelf ? "bg-yellow-500 text-black ml-auto" : "bg-[#2b2b2b] text-white"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSend} className="flex">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-l-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-r-lg text-sm transition duration-200"
            >
              Send
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center text-slate-400">
          <NoChatSelected />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
