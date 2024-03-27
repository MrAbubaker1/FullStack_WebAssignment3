import client from "../../libs/prismadb";
import { NextResponse } from "next/server";

// url: http://localhost:3000/api/movies

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { title, actors, releaseYear } = body;
    const newMovie = await client.movie.create({
      data: {
        title,
        actors,
        releaseYear,
      },
    });

    return NextResponse.json(newMovie, {
      headers: {
        "Access-Control-Allow-Origin": "https://full-stack-web-assignment3-v1cn.vercel.app/moviepage",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating movie entry", error },
      { status: 500 }
    );
  }
};
