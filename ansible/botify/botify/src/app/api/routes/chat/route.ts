// import { WebSocketServer } from 'ws';

// const ws = new WebSocketServer({ port: 8080 });

// // Keep track of conversation history for each connection
// const conversationHistories = new Map();

// ws.on("connection", function connection(ws) {
//   // Initialize conversation history for this connection
//   const conversationId = Math.random().toString(36).substring(7);
//   conversationHistories.set(conversationId, []);

//   ws.on("message", async function message(data) {
//     try {
//       const messageData = JSON.parse(data.toString());
//       const userMessage = messageData.message;
      
//       // Get conversation history
//       const history = conversationHistories.get(conversationId);
      
//       // Add user message to history
//       history.push({
//         role: 'user',
//         content: userMessage
//       });

//       // Configure Ollama endpoint
//       const OLLAMA_ENDPOINT = 'http://localhost:11434/api/chat';
      
//       // Prepare the request to Ollama
//       const response = await fetch(OLLAMA_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           model: 'llama3.2',
//           messages: history,
//           stream: false
//         })
//       });

//       console.log(response)
//       if (!response.ok) {
//         throw new Error(`Ollama API error: ${response.statusText}`);
//       }

//       const ollamaResponse = await response.json();
      
//       // Add assistant's response to history
//       history.push({
//         role: 'assistant',
//         content: ollamaResponse.message.content
//       });

//       // Limit history to last 10 messages to prevent context getting too large
//       if (history.length > 10) {
//         history.splice(0, history.length - 10);
//       }

//       // Send formatted response back to client
//       ws.send(JSON.stringify({
//         content: ollamaResponse.message.content,
//         id: Date.now().toString(),
//         timestamp: new Date().toISOString()
//       }));

//     } catch (error) {
//       console.error('Error processing message:', error);
//       ws.send(JSON.stringify({
//         content: 'Sorry, I encountered an error processing your message.',
//         id: Date.now().toString(),
//         timestamp: new Date().toISOString()
//       }));
//     }
//   });

//   // Send welcome message
//   ws.send(JSON.stringify({
//     content: "Hello! I'm your AI assistant. How can I help you today?",
//     id: Date.now().toString(),
//     timestamp: new Date().toISOString()
//   }));

//   // Cleanup when connection closes
//   ws.on("close", () => {
//     conversationHistories.delete(conversationId);
//   });
// });