import { getChatbotById } from "@/app/api/models/chatbot.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const id = pathSegments[pathSegments.length - 1];
  if (!id)
    return NextResponse.json(
      { message: "missing information: id" },
      { status: 400 }
    );
  try {
    const chatbot = await getChatbotById(id);
    if (!chatbot) {
      return NextResponse.json(
        { message: "Error fetching chatbot" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "success", chatbot }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
