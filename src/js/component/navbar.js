import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/StarWarsLogo.png";
import Favorites from "./Favorites.jsx";
import { Context } from "../store/appContext.js";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	const handleFavoriteRemove = (uid,type) =>{
  	actions.removeFavorite(uid,type)
}
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container-fluid d-flex justify-content-between">
        <div>
          <Link to="/" className="m-auto">
            <span className="navbar-brand mb-0 h1 ms-5">
              <img
                src={logo}
                style={{ maxWidth: "80px" }}
                alt="StarWars Logo"
              />
            </span>
          </Link>
        </div>
        <div className="me-5">
          <Favorites favorites={store.favorites} onDelete={handleFavoriteRemove}/>
        </div>
      </div>
		</nav>
	);
};
