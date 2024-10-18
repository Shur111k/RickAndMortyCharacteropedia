import { useState, useEffect, useRef } from "react";
import CharacterList from "./components/CharacterList";
import Filter from "./components/Filter";
import api from "./axiosInstance";
import "./App.module.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    status: "None",
    gender: "None",
  });

  const observer = useRef();

  const lastCharacterElementRef = useRef(null);

  const fetchCharacters = async (page = 1, newFilters = filters) => {
    setIsLoading(true);
    try {
      const filterParams = {
        page,
        ...(newFilters.name && { name: newFilters.name }),
        ...(newFilters.status !== "None" && { status: newFilters.status }),
        ...(newFilters.gender !== "None" && { gender: newFilters.gender }),
      };
  
      const { data } = await api.get("/", { params: filterParams });
  
      setCharacters((prevCharacters) => {
        if (page === 1) return data.results;
        const newCharacters = data.results.filter(
          (character) => !prevCharacters.some((prev) => prev.id === character.id)
        );
        return [...prevCharacters, ...newCharacters];
      });
      setHasMore(data.info.next !== null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(observerCallback, options);

    if (lastCharacterElementRef.current) {
      observer.current.observe(lastCharacterElementRef.current);
    }

    return () => {
      if (observer.current && lastCharacterElementRef.current) {
        observer.current.unobserve(lastCharacterElementRef.current);
      }
    };
  }, [isLoading, hasMore]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchCharacters(1, newFilters);
  };

  return (
    <div className="app">
      {error && <p>Error loading characters: {error.message}</p>}
      <Filter onFilterChange={handleFilterChange} />
      <CharacterList characters={characters} />
      {isLoading && <p>Loading...</p>}
      {}
      <div ref={lastCharacterElementRef}></div>
    </div>
  );
}

export default App;
