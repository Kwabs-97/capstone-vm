import { generateWelcomeMessage } from "@/app/api/models/ollama.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const companyName =  await req.text()    
  console.log(companyName)      

  try {
    const res = await generateWelcomeMessage(companyName!);
    console.log(res);
    return NextResponse.json(
      {
        message: "generate welcome message request succes",
        fallbackMessage: res,
       
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
