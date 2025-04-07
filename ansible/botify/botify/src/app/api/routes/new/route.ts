import { NextResponse, NextRequest } from "next/server";
import { createChatbot } from "../../models/chatbot.model";
import { ChatbotDataInterface } from "@/app/types";

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ message: "no body" }, { status: 400 });
  }
  try {
    const body = await req.json();
    
    const chatbotData: ChatbotDataInterface = body;
    console.log(
      "chatbot data received at the backend-----------------",
      chatbotData
    );

    await createChatbot(chatbotData);

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
