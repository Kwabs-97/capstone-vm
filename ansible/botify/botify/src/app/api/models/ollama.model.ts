import { ChatGroq } from "@langchain/groq";
import { ChatOllama } from "@langchain/ollama";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";
const model = new ChatOllama({
  model: "llama3.2",
});

export async function generateWelcomeMessage(companyName: string) {
  const messages = [
    new SystemMessage(
      "You're a chatbot agent, generate a one-line simple welcome message for the company named below and ask how you can be of help"
    ),
    new HumanMessage(companyName),
  ];

  const response = await model.invoke(messages);
  console.log(response)
  return response.content;


}
