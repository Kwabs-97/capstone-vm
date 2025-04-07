import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
const model = new ChatGroq({
  temperature: 2,
  model: "mixtral-8x7b-32768",
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
