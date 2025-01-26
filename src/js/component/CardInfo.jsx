import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/CardInfo.css";
import { Context } from "../store/appContext";

const CardInfo= ({ title, uid, type, body }) => {
  const { store, actions } = useContext(Context);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const isFav = store.favorites.some((item) => item.uid === uid && item.type === type);
    setFavorite(isFav);
  }, [store.favorites, uid, type]);

  const handleFavoriteToggle = () => {
    if (favorite) {
      actions.removeFavorite(uid, type);
    } else {
      actions.addFavorite({ uid, title, type });
    }
    setFavorite(!favorite);
  };

  const handleImgError = (e) => {
    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
  };

  const cardTitle = title || "Untitled";

  return (
    <div className="card" style={{ minWidth: "320px", height: "100%" }}>
      <div className="container-fluid m-0 p-0 image-container">
        <img
          src={`https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`}
          className="card-img-top"
          alt={cardTitle}
          onError={handleImgError}
          loading="lazy"
        />
      </div>
      <div className="card-body text-start">
        <h5 className="card-title bold ms-3">{cardTitle}</h5>
        {body}
        <div className="d-flex justify-content-between mt-3">
          <Link to={`/${type}/${uid}`} className="btn btn-outline-primary">
            Learn More
          </Link>
          <button
            onClick={handleFavoriteToggle}
            className={`btn btn-outline-warning ${favorite ? "active" : ""}`}
          >
            ♥️
          </button>
        </div>
      </div>
    </div>
  );
};

CardInfo.propTypes = {
  title: PropTypes.string,
  uid: PropTypes.string,
  type: PropTypes.string,
  body: PropTypes.node,
};

export default CardInfo;
