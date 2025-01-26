import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "../component/Jumbotron.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/Details.css";

const Details = () => {
  const { type, id } = useParams();
  const { store } = useContext(Context);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const renderDetails = () => {
    if (!detailData || !detailData.properties) return null;

    const { properties } = detailData;
    if (type === "people") {
      return (
        <>
          <div className="spec-item"><strong>Name:</strong> {properties.name}</div>
          <div className="spec-item"><strong>Birth Year:</strong> {properties.birth_year}</div>
          <div className="spec-item"><strong>Gender:</strong> {properties.gender}</div>
          <div className="spec-item"><strong>Height:</strong> {properties.height}</div>
          <div className="spec-item"><strong>Skin Color:</strong> {properties.skin_color}</div>
          <div className="spec-item"><strong>Eye Color:</strong> {properties.eye_color}</div>
      </>
      );
    }

    if (type === "planets") {
      return (
        <>
        <div className="spec-item"><strong>Name:</strong> {properties.name}</div>
        <div className="spec-item"><strong>Diameter:</strong> {properties.diameter}</div>
        <div className="spec-item"><strong>Population:</strong> {properties.population}</div>
        <div className="spec-item"><strong>Climate:</strong> {properties.climate}</div>
        <div className="spec-item"><strong>Terrain:</strong> {properties.terrain}</div>
        <div className="spec-item"><strong>Gravity:</strong> {properties.gravity}</div>
        <div className="spec-item"><strong>Surface Water:</strong> {properties.surface_water}</div>
      </>
      );
    }

    if (type === "films") {
      return (
        <>
          <div className="spec-item"><strong>Title:</strong> {properties.title}</div>
          <div className="spec-item"><strong>Director:</strong> {properties.director}</div>
          <div className="spec-item"><strong>Producer:</strong> {properties.producer}</div>
          <div className="spec-item"><strong>Release Date:</strong> {properties.release_date}</div>
          <div className="spec-item"><strong>Episode:</strong> {properties.episode_id}</div>
      </>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!type || !id) return;

    setLoading(true);
    const resourceType = type === "people" ? "people" : type;
    const resource = store[`${resourceType}Details`]?.find((item) => item.uid === id);
    setDetailData(resource || {});
    setLoading(false);
  }, [type, id, store]);

  return !loading && detailData ? (
    <Jumbotron
      type={type}
      uid={detailData.uid}
      title={type === "films" ? detailData.properties.title : detailData.properties.name}
      text={type === "films" ? detailData.properties.opening_crawl : detailData.description}
      specs={renderDetails()}
    />
  ) : (
    <div>Loading Content...</div>
  );
};

export default Details;
