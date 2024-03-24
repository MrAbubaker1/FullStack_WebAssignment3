import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to IMR</h1>
        <p className="text-xl text-center mb-8">Your destination for renting movies online</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md text-center">
            Log In
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-md text-center">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
