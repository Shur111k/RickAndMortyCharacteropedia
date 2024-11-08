import { useState, useEffect, useRef, useCallback } from "react";
import CharacterList from "./components/CharacterList";
import Filter from "./components/Filter";
import api from "./axiosInstance";
import "./App.module.css";

function App() {
  const [charactersData, setCharactersData] = useState({
    characters: [],
    info: { next: null },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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

      setCharactersData((prevData) => {
        const newCharacters =
          page === 1
            ? data.results
            : [
                ...prevData.characters,
                ...data.results.filter(
                  (character) =>
                    !prevData.characters.some(
                      (prev) => prev.id === character.id
                    )
                ),
              ];

        return {
          characters: newCharacters,
          info: data.info,
        };
      });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = useCallback(
    (entries) => {
      if (isLoading || !charactersData.info.next) return;

      if (entries[0].isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    },
    [isLoading, charactersData.info.next]
  );

  const setupObserver = () => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleNextPage, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (lastCharacterElementRef.current) {
      observer.current.observe(lastCharacterElementRef.current);
    }
  };

  useEffect(() => {
    setupObserver();

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [charactersData.info.next]);

  useEffect(() => {
    fetchCharacters(currentPage, filters);
  }, [currentPage, filters]);
  

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="app">
      {error && <p>Error loading characters: {error.message}</p>}
      <Filter onFilterChange={handleFilterChange} />
      <CharacterList characters={charactersData.characters} />
      {isLoading && <p>Loading...</p>}
      {!isLoading && <div ref={lastCharacterElementRef}></div>}
    </div>
  );  
}

export default App;

