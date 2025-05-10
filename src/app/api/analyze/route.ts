import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  if (request === null) {
    return NextResponse.json({ error: "Request is null" }, { status: 400 });
  }

  try {
    const body = await request.json();

    // Forward the request to the backend service
    const response = await axios.post("http://localhost:3000/main/mood", body);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json(
      { error: "Failed to analyze situation" },
      { status: 500 }
    );
  }
}
