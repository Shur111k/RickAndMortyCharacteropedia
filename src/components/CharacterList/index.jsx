import PropTypes from "prop-types";
import CharacterCard from "../CharacterCard";
import styles from "./style.module.css";

const CharacterList = ({ characters }) => {
  return (
    <div className={styles.characterList}>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
      episode: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default CharacterList;
