import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const Filter = ({ onFilterChange }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("None");
  const [gender, setGender] = useState("None");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ name, status, gender });
  };

  const handleClearFilters = () => {
    setName("");
    setStatus("None");
    setGender("None");
    onFilterChange({ name: "", status: "None", gender: "None" });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <div className={styles.imageContainer}>
          <img src="/header.png" alt="Character Image" />
        </div>
        <form className={styles.filterForm} onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search for a character"
            />
          </label>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="None">None</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="None">None</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </form>
      </div>
    </div>
  );  
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
