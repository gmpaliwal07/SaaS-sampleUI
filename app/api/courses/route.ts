import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(`${process.env.API_URL}/courses`, {
        headers: {
          "Content-Type": "application/json",
        },
    })

    const data = response.data;
    return NextResponse.json(data, {status : 200});
  } catch (error) {
    return NextResponse.json(
      {
        error: error||  "An error occurred while fetching courses.",
      },
      { status: 500 }
    );
  }
}
