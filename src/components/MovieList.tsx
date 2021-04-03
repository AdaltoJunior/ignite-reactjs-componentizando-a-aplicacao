import { useState, useEffect } from "react";

import { MovieCard } from "./MovieCard";

import { useGenres } from "../hooks/useGenres";

import { api } from '../services/api';

import '../styles/movie-list.scss';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { selectedGenreId } = useGenres();

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
      ))}
    </div>
  );
}
