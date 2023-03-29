import { useEffect, useState } from "react";
import getPage from "../api/content";
import "./styles.scss";
import { CompareMovies } from "./compareMovies";
import { MovieGridItem } from "./movieGridItem";


const MovieGrid = () => {
  const initialState = { first: {}, second: {} };
  const [movies, setMovies] = useState(null);
  const [selected, setSelected] = useState(initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getPage();

      setMovies(movies.blocks[0].products);
    };
    fetchMovies();
  }, []);
  const onClearClick = () => setSelected(initialState);

  const onSelectClick = (movie) => {
    // Do not set state if we have selected first and second movie
    if (
      Object.keys(selected.first).length > 0 &&
      Object.keys(selected.second).length > 0
    ) {
      return;
    }

    // Do not make it possible to compare the movie with itself
    if (selected.first.guid === movie.guid) return;

    const key = Object.keys(selected.first).length === 0 ? "first" : "second";

    setSelected((prevState) => ({
      ...prevState,
      [key]: movie,
    }));
  };

  return (
    <div>
      <CompareMovies selected={selected} onClearClick={onClearClick} />
      <div className="grid-container">
        {movies?.map((movie) => {
          return (
            <MovieGridItem
              key={movie.guid}
              movie={movie}
              onSelectClick={onSelectClick}
              selected={selected}
            />
          );
        })}
      </div>
    </div>
  );
};

export { MovieGrid };
