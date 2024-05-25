/* eslint-disable jsx-a11y/alt-text */
// src/MoviesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/peliculas/creacionPelicula');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Lista de Películas</h1>
      {movies.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <li key={movie.id} className=" bg-pink-200 rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-semibold mb-2">{movie.nombre}</h2>
              <img src={movie.poster} alt={`Poster de ${movie.nombre}`} className="w-full h-64 object-cover rounded-t-md " style={{ width: '350px', height: '500px' }}/>
              <p><strong>Género:</strong> {movie.genero}</p>
              <p><strong>Duración:</strong> {movie.duracion} minutos</p>
              <p><strong>País:</strong> {movie.pais}</p>
              <p><strong>Fecha de Estreno:</strong> {movie.f_estreno}</p>
              {movie.trailer && (
                <p>
                  <strong>Trailer:</strong> <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver trailer</a>
                </p>
              )}
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Protagonistas:</strong> {movie.protagonistas}</p>
              <p><strong>Precio:</strong> {movie.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No se encontraron películas.</p>
      )}
    </div>
  );
}

export default HomePage;
