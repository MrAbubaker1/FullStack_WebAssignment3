import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


const commonHeaders = {
  "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
};

export const GET = async (request, { params }) => {
    try {
        const { id } = params;
        const movie = await client.movie.findUnique({
            where: { id }
        });
        if (!movie) {
            return NextResponse.json({ status: 404, message: "Movie not found" }, { headers: commonHeaders });
        }
        return NextResponse.json(movie, { headers: commonHeaders });
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Error getting movie", error }, { headers: commonHeaders });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const body = await request.json();
        const { id } = params;
        const { title, actors, releaseYear } = body;

        const updatedMovie = await client.movie.update({
            where: { id },
            data: { title, actors, releaseYear }
        });

        if (!updatedMovie) {
            return NextResponse.json({ status: 404, message: "Movie not found" }, { headers: commonHeaders });
        }

        return NextResponse.json(updatedMovie, { headers: commonHeaders });
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Error updating movie", error }, { headers: commonHeaders });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const { id } = params;
        await client.movie.delete({ where: { id } });
        return NextResponse.json({ status: 200, message: "Movie deleted" }, { headers: commonHeaders });
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Error deleting movie", error }, { headers: commonHeaders });
    }
};
