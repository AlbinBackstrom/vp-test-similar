import "./styles.scss";
import { compare } from "../utils/comparer";

const CompareMovies = ({ selected, onClearClick }) => {
  const haveSelectedMovies =
    Object.keys(selected.first).length > 0 &&
    Object.keys(selected.second).length > 0;

  let similarities = [];

  if (haveSelectedMovies) {
    similarities = compare(selected);
  }
  return (
    <div className="compare-container">
      {haveSelectedMovies ? (
        <>
          <div className="movie">
            <img
              src={`https://via.placeholder.com/240x320.png?text=${selected.first?.title}`}
              alt="placeholder first movie"
            />
          </div>
          <div className="info">
            <div>
              {similarities.length >= 3 ? <h3>YES</h3> : <h3>NO</h3>}
              <button onClick={onClearClick}>Clear selection</button>
              <ul>
                {similarities.length >= 3 &&
                  similarities.map((item) => {
                    return (
                      <li>
                        <span>{item.key} </span>
                        <span>{item.value} </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="movie">
            <img
              src={`https://via.placeholder.com/240x320.png?text=${selected.second?.title}`}
              alt="placeholder second movie"
            />
          </div>
        </>
      ) : (
        <div className="empty-msg">
          <h3>Select two movies below to see their similarities </h3>
        </div>
      )}
    </div>
  );
};

export { CompareMovies };
