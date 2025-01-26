import React from "react";
import { Link } from "react-router-dom";

const Favorites = ({ favoritesList, onRemove }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="favoritesMenu"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        Favorites{" "}
        <span className="badge bg-secondary ms-2">{favoritesList.length}</span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="favoritesMenu"
        style={{ minWidth: "200px" }}
      >
        {favoritesList.length > 0 ? (
          favoritesList.map((item, idx) => (
            <li key={idx} className="d-flex m-2 align-items-center">
              <Link
                to={`/${item.type}/${item.uid}`}
                className="dropdown-item"
              >
                {item.title}
              </Link>
              <button
                className="btn btn-danger ms-2"
                onClick={() => onRemove(item.uid, item.type)}
              >
                🗑️
              </button>
            </li>
          ))
        ) : (
          <li className="text-center p-2">(Empty)</li>
        )}
      </ul>
    </div>
  );
};

export default Favorites;
