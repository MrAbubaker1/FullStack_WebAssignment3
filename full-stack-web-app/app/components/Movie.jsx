'use client'
import axios from "axios";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Movie = ({ movie, onDelete }) => {
    const Router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [movieToEdit, setMovieToEdit] = useState(movie);
    const [showDeleteModal, setShowDeleteModal] = useState(false);  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieToEdit((prevState) => ({
            ...prevState,
            [name]: name === 'actors' ? value.split(',') : name === 'releaseYear' ? parseInt(value) : value
        }));
    };
    
    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/api/movies/${movie.id}`, movieToEdit)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setMovieToEdit({});
                setShowModal(false);
                Router.refresh();
            });
    };

    const handleDeleteMovie = (id) => {
        axios.delete(`/api/movies/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setShowDeleteModal(false);
                Router.refresh();
            });
    };

    // Format actors array as comma-separated string
    const formattedActors = movie.actors.join(', ');

    return (
        <li className="p-3 my-5 bg-slate-400" key={movie.id}>
            <h1>{movie.title}</h1>
            <p>{formattedActors}</p> {/* Display formatted actors */}
            <p>{movie.releaseYear}</p>
            <div>
                <button onClick={() => setShowModal(true)} className="bg-green-600 text-white mr-2" style={{ width: '80px' }}>Edit</button>
                <button onClick={() => handleDeleteMovie(movie.id)} className="bg-red-600 text-white" style={{ width: '80px' }}>Delete</button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <form className="w-full px-5 pb-6" onSubmit={handleEditSubmit}>
                    <h1 className="mb-2 text-2xl">Edit Movie</h1>
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                        className="w-full p-2 mb-3"
                        value={movieToEdit.title}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="actors"
                        name="actors"
                        className="w-full p-2 mb-3"
                        value={movieToEdit.actors}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="releaseYear"
                        name="releaseYear"
                        className="w-full p-2 mb-3"
                        value={movieToEdit.releaseYear}
                        onChange={handleChange}
                    />

                    <button type="submit" className="bg-blue-700 text-white px-5 py-2">Update Movie</button>
                </form>
            </Modal>
            {showDeleteModal && (
                <Modal>
                    <div>
                        <p>Are you sure you want to delete this movie?</p>
                        <button onClick={() => handleDeleteMovie(movie.id)} className="bg-red-500 text-white mr-2">Yes</button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-blue-500 text-white">No</button>
                    </div>
                </Modal>
            )}
        </li>
    );
};

export default Movie;
