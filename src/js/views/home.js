import React, { useContext, useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import CardInfo from "../component/CardInfo.jsx";
import { Context } from "../store/appContext.js";




export const Home = () => {
	const { store, actions } = useContext(Context);

	const characterBodyBuilder = (data) => (
		<ul className="list-group list-group-flush text-start pb-2">
		  <li className="list-group-item">Gender: {data.properties.gender}</li>
		  <li className="list-group-item">
			Eyes Color: {data.properties.eye_color}
		  </li>
		  <li className="list-group-item">
			Hair Color: {data.properties.hair_color}
		  </li>
		</ul>
	  );
	
	const planetBodyBuilder = (data) => (
		<ul className="list-group list-group-flush text-start pb-2">
		  <li className="list-group-item">
			Population: {data.properties.population}
		  </li>
		  <li className="list-group-item">
			Terrains: {data.properties.terrain}
		  </li>
		</ul>
	  );
	  
	const filmsBodyBuilder = (data) => (
		<ul className="list-group list-group-flush text-start pb-2">
		  <li className="list-group-item">
			Director: {data.properties.director}
		  </li>
		  <li className="list-group-item">
			Producer: {data.properties.producer}
		  </li>
		</ul>
	  );
  
	const renderCards = (data, builderFunction, type) => {
	  return data.map((item, idx) => {
		const content = builderFunction(item);
		return (
		  <CardInfo
			key={idx}
			title={type === "films" ? item.properties.title : item.properties.name}
			uid={item.uid}
			body={content}
			type={type}
			eyeColor={item.properties.eye_color}
			hairColor={item.properties.hair_color}
			gender={item.properties.gender}
		  />
		);
	  });
	};
  
	return (
	  <div className="mt-5 text-start">
		<h1 className="text-danger fw-bold ms-3">Characters</h1>
		<div className="overflow-container mb-3">
		  {store.isLoading ? (
			<div className="container-fluid d-flex justify-content-center align-items-center">
			  <div
				className="spinner-grow text-danger"
				role="status"
				style={{ width: "150px", height: "150px" }}
			  >
				<span className="visually-hidden">Loading...</span>
			  </div>
			</div>
		  ) : (
			renderCards(store.peopleDetails, characterBodyBuilder, "people")
		  )}
		</div>
  
		<h1 className="text-danger fw-bold ms-3">Planets</h1>
		<div className="overflow-container mb-3">
		  {store.planetsDetails.length === 0
			? "Loading Content"
			: renderCards(store.planetsDetails, planetBodyBuilder, "planets")}
		</div>
  
		<h1 className="text-danger fw-bold ms-3">Films</h1>
		<div className="overflow-container mb-3">
		  {store.filmDetails.length === 0
			? "Loading Content"
			: renderCards(store.filmDetails, filmsBodyBuilder, "films")}
		</div>
	  </div>
	);
  };
