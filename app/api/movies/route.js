import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

const commonHeaders = {
  "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
};

export const POST = async (req) => {
  try {
      const body = await req.json();
      const { title, actors, releaseYear } = body;
      const newMovie = await client.movie.create({
          data: { title, actors, releaseYear }
      });
      return NextResponse.json(newMovie, { headers: {
          ...commonHeaders,
          "Access-Control-Allow-Origin": "https://full-stack-web-assignment3-yse9.vercel.app/moviepage",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
      } });
  } catch (error) {
      return NextResponse.json({ status: 500, message: "Error creating movie entry", error }, { headers: commonHeaders });
  }
};