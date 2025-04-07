"use client";
import { Send } from "@/assets/icons";
import { Paperclip } from "lucide-react";
import { SendHorizonal } from "lucide-react";
import Attachement from "@/assets/icons/Attachement";
import React, { useEffect } from "react";
import { Smile } from "lucide-react";
import Textarea from "../../misc/forminput/textarea";
function ChatInput({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border rounded-md border-gray-300 bg-gray-50">
      <div className="flex flex-row gap-2 items-center pr-4">
        <Textarea 
          className="w-full min-h-24 text-gray-900 border-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <div className="flex flex-row gap-2 items-center">
          <div>
            <label htmlFor="attachment">
              <Paperclip color="gray" />
            </label>
            <input type="file" className="hidden" id="attachment" />
          </div>
          <Smile color="gray" className="hover:cursor-pointer" />
          <SendHorizonal 
            color="blue" 
            className="hover:cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
