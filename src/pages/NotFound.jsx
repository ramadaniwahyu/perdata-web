import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl text-blue-600 lg:text-6xl">
              404
            </h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span>
            </h6>

            <p className="mb-4 text-center text-gray-500 md:text-lg">
              Halaman yang anda inginkan tidak ditemukan.
            </p>
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="px-5 py-2 rounded-md text-blue-600 hover:text-blue-100 bg-blue-200 hover:bg-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="ml-5 px-5 py-2 rounded-md text-red-600 hover:text-green-100 bg-red-200 hover:bg-red-600"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
