import React, { useState, useEffect } from "react";
import ChatInput from "./chatInput";
import QueryContainer from "../QueryContainer";
import { ChatbotDataInterface } from "@/app/types"; 

function Playground({ chatbotData }: { chatbotData: ChatbotDataInterface }) {
  interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  const [messages, setMessages] = useState<Message[]>([]);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  // useEffect(() => {
  //   // Initialize WebSocket connection
  //   const ws = new WebSocket('ws://localhost:8080/api/routes/chat');
    
  //   ws.onopen = () => {
  //     console.log('WebSocket Connected');
  //     setSocket(ws);
  //   };

  //   ws.onmessage = (event) => {
  //     const message = event.data;
  //     setMessages(prev => [...prev, {
  //       id: crypto.randomUUID(),
  //       content: message.content,
  //       role: 'assistant',
  //       timestamp: new Date()
  //     }]);
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   ws.onclose = () => {
  //     console.log('WebSocket disconnected');
  //     setSocket(null);
  //   };

  //   // Cleanup on unmount
  //   return () => {
  //     if (ws) {
  //       ws.close();
  //     }
  //   };
  // }, []);

  const sendMessage = (content: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        id: crypto.randomUUID(),
        content,
        role: 'user' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      socket.send(JSON.stringify(content));
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
    <header className="bg-white border-b px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
       
          <div>
            <h3 className="font-medium text-gray-900">
              {chatbotData?.name || "AI Assistant"}
            </h3>
            <div className="flex items-center flex-row gap-2">

            <p className="text-sm text-gray-500">Online</p>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        
        </div>
      </div>
    </header>

    {/* Chat Messages Area */}
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="flex flex-col space-y-4">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="px-4 py-1 rounded-full bg-gray-100 text-sm text-gray-600">
            Today
          </span>
        </div>

        {/* Welcome Message */}
        <div className="flex justify-start">
          <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-[80%] shadow-sm">
            <p className="text-gray-800">{chatbotData?.welcome_message || "Hello! How can I help you today?"}</p>
          </div>
        </div>

        {/* Message List */}
        {messages.map((message) => (
          <div key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl p-4 max-w-[80%] shadow-sm
              ${message.role === 'user' 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-tl-none'}`}>
              <p>{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Input Area */}
    <div className="px-6 py-4 bg-white mt-auto">
      <ChatInput onSendMessage={sendMessage} />
    </div>
  </div>

  );
}

export default Playground;

