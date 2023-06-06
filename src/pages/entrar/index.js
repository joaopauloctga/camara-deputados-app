import React from 'react';

const FormLogin = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleLoginWithGoogle = () => {
    // Handle login with Google logic here
  };

  const handleLoginWithFacebook = () => {
    // Handle login with Facebook logic here
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-8">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="flex flex-col items-center mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Submit
          </button>
          <div className="flex items-center mb-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-600 font-bold">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Login with Google
          </button>
          <button
            type="button"
            onClick={handleLoginWithFacebook}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            Login with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;