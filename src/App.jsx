import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./components/CharacterList";
import "./App.module.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCharacters = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      setCharacters((prevCharacters) => {
        const newCharacters = response.data.results.filter(
          (character) =>
            !prevCharacters.some((prev) => prev.id === character.id)
        );
        return [...prevCharacters, ...newCharacters];
      });

      setHasMore(response.data.info.next !== null);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  return (
    <div className="app">
      {error && <p>Error loading characters: {error.message}</p>}
      <CharacterList characters={characters} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
