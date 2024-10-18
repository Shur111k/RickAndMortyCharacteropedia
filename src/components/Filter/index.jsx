import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import headerImage from "/header.png";
import SelectOptions from "../SelectOptions"

const statusOptions = ["None", "Alive", "Dead", "unknown"];
const genderOptions = ["None", "Male", "Female", "unknown"];

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    status: "None",
    gender: "None",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const resetFilters = {
      name: "",
      status: "None",
      gender: "None",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <div className={styles.imageContainer}>
          <img src={headerImage} alt="Character" />
        </div>
        <form className={styles.filterForm} onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Search for a character"
            />
          </label>
          <label>
            Status:
            <SelectOptions
              options={statusOptions}
              value={filters.status}
              name="status"
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <SelectOptions
              options={genderOptions}
              value={filters.gender}
              name="gender"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
          <button type="reset" onClick={handleClearFilters}>
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
