import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { title, actors, releaseYear } = body;
        const newMovie = await client.movie.create({
            data: { title, actors, releaseYear }
        });
        return NextResponse.json(newMovie);
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Error creating movie entry", error });
    }
};
