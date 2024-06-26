"use client";
import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddMovie = () => {
    const Router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'actors') {
        const actorsArray = value.split(',').map(actor => actor.trim());
        setInput(prevState => ({ ...prevState, [name]: actorsArray }));
    } else if (name === 'releaseYear') {
        setInput(prevState => ({ ...prevState, [name]: parseInt(value) || '' }));
    } else {
        setInput(prevState => ({ ...prevState, [name]: value }));
    }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/movies", input).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
    setInput({});
    setShowModal(false);
    Router.refresh();
})
  }
  
  return (
    <div>
      <h1 className="text-5xl mb-10 font-bold text-center text-gray-800 font-sans mt-10">IMR Movie Portal</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-800 text-white p-3 cursor-pointer"
      >
        Add New Movie
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <form className="w-full px-5 pb-6" onSubmit={handleSubmit}>
          <h1 className="mb-2 text-2xl">Add a new Movie</h1>
          <input
            type="text"
            placeholder="title"
            name="title"
            className="w-full p-2 mb-3"
            value={input.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="actors (comma separated)"
            name="actors"
            className="w-full p-2 mb-3"
            value={input.actors}
            onChange={handleChange}
          />
        
          <input
            type="text"
            placeholder="release year (number)"
            name="releaseYear"
            className="w-full p-2 mb-3"
            value={input.releaseYear}
            onChange={handleChange}
          />
          <button type="submit" className="bg-blue-800 text-white px-5 py-2">
            submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddMovie;