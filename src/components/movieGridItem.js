import "./styles.scss";
const MovieGridItem = ({ movie, onSelectClick, selected }) => {
  const isSelected =
    selected.first.guid === movie.guid || selected.second.guid === movie.guid;

  return (
    <div
      onClick={() => onSelectClick(movie)}
      className={`grid-item ${isSelected ? "selected" : ""}`}
    >
      {movie.title}
    </div>
  );
};

export { MovieGridItem };
