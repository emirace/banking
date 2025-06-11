import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../../services/support";

interface Message {
  _id: string;
  sender: string;
  message: string;
  isAdmin: boolean;
}

export default function UserSupport() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const newMessage = await sendMessage({
        receiver: "Admin",
        message,
        isAdmin: false,
      });
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">Support Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mt-2 flex flex-col-reverse ">
        {messages
          .slice()
          .reverse()
          .map((msg) => (
            <div
              key={msg._id}
              className={`p-2 ${
                msg.isAdmin ? "text-right text-blue-500" : "text-left"
              }`}
            >
              <p className="p-2 rounded bg-gray-200 inline-block whitespace-pre-line">
                {msg.message}
              </p>
            </div>
          ))}
      </div>

      {/* Input & Send Button */}
      <div className="flex mt-2">
        <textarea
          className="flex-1 border p-2 rounded resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          rows={3}
        />
        <button
          className="ml-2 max-h-14 bg-blue-500 text-white p-2 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
