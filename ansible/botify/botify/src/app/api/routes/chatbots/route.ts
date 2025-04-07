import { NextResponse } from "next/server";
import { getAllChatbots, getChatbotById } from "../../models/chatbot.model";
export async function GET() {
  try {
    const res = await getAllChatbots();
    if (!res) {
      return NextResponse.json(
        { message: "no chatbots found" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "chatbots fetched successfully", chatbots: res },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching bots", error);
    return NextResponse.json({ message: "internal error" }, { status: 500 });
  }
}
