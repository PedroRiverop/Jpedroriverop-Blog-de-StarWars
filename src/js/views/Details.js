import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Jumbotron from "../component/Jumbotron.jsx";
import { Context } from "../store/appContext.js";

const Details = () => {
  const { type, id } = useParams();
  const { store } = useContext(Context);
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  const renderDetails = () => {
    if (!detailData || !detailData.properties) return null;

    const { properties } = detailData;
    if (type === "characters") {
      return (
        <>
          <div className="col"><strong>Name</strong><br />{properties.name}</div>
          <div className="col"><strong>Birth Year</strong><br />{properties.birth_year}</div>
          <div className="col"><strong>Gender</strong><br />{properties.gender}</div>
          <div className="col"><strong>Height</strong><br />{properties.height}</div>
          <div className="col"><strong>Skin Color</strong><br />{properties.skin_color}</div>
          <div className="col"><strong>Eye Color</strong><br />{properties.eye_color}</div>
        </>
      );
    }

    if (type === "planets") {
      return (
        <>
          <div className="col"><strong>Name</strong><br />{properties.name}</div>
          <div className="col"><strong>Diameter</strong><br />{properties.diameter}</div>
          <div className="col"><strong>Population</strong><br />{properties.population}</div>
          <div className="col"><strong>Climate</strong><br />{properties.climate}</div>
          <div className="col"><strong>Terrain</strong><br />{properties.terrain}</div>
          <div className="col"><strong>Gravity</strong><br />{properties.gravity}</div>
          <div className="col"><strong>Surface Water</strong><br />{properties.surface_water}</div>
        </>
      );
    }

    if (type === "films") {
      return (
        <>
          <div className="col"><strong>Title</strong><br />{properties.title}</div>
          <div className="col"><strong>Director</strong><br />{properties.director}</div>
          <div className="col"><strong>Producer</strong><br />{properties.producer}</div>
          <div className="col"><strong>Release Date</strong><br />{properties.release_date}</div>
          <div className="col"><strong>Episode</strong><br />{properties.episode_id}</div>
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    if (!type || !id) return;

    setLoading(true);
    const resourceType = type === "characters" ? "people" : type;
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
