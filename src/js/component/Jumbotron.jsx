import React from "react";
import PropTypes from "prop-types";
import "../../styles/CardInfo.css";

const Jumbotron = ({ title, text, type, uid, specs }) => {
  const handleImgError = (e) => {
    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div
            className="image-container"
            style={{ height: "400px", overflow: "hidden" }}
          >
            <img
              src={`https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`}
              className="card-img-top"
              alt={title}
              onError={handleImgError}
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
      <div className="row mt-3">
        <div
          className="m-auto"
          style={{ backgroundColor: "red", height: "2px", width: "100%" }}
        ></div>
      </div>
      <div className="row mt-3">
        <div className="col-12 text-danger">{specs}</div>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  uid: PropTypes.string,
  specs: PropTypes.node,
};

export default Jumbotron;
