import { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

import { api } from '../services/api';

interface GenresProviderProps {
  children: ReactNode;
}

interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenresContextData {
  genres: Genre[];
  selectedGenre: Genre;
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

const GenreContext = createContext({} as GenresContextData);

export function GenresProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  const contextData: GenresContextData = {
    genres,
    selectedGenre,
    selectedGenreId,
    setSelectedGenreId,
  };

  return (
    <GenreContext.Provider value={contextData}>
      {children}
    </GenreContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenreContext);
  return context;
}
