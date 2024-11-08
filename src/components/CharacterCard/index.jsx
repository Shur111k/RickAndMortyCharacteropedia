import PropTypes from "prop-types";
import styles from "./style.module.css";

const CharacterCard = ({ character }) => {
  return (
    <div className={styles.card}>
      <img
        src={character.image}
        alt={character.name}
        className={styles.image}
      />
      <div className={styles.info}>
        <h2 className={styles.name}>
          #{character.id} {character.name}
        </h2>
        <p className={styles.details}>
          {character.status} - {character.species} - {character.gender}
        </p>
        <p>Last known location:</p>
        <p className={styles.location}>{character.location.name}</p>
        <p>First seen in: </p>
        <p className={styles.episode}>
          <a href={character.episode[0]}>{character.episode[0]}</a>
        </p>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    episode: PropTypes.array.isRequired,
  }).isRequired,
};

export default CharacterCard;
