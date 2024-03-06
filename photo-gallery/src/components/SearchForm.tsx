import React from "react";
import "./styles.scss";
import { UseDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { findKeyword } from "../state/image/imageSlice";
import { useDispatch } from "react-redux";
import searchIcon from "../images/search.png";
import logo from "../images/logo.png";

const SearchForm = () => {
  const searchKey = useSelector((state: RootState) => state.image.value);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword in the Redux store as the user types
    dispatch(findKeyword(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(findKeyword(searchKey));
  };

  return (
    <div>
      <h1 className="title"> Unsplash Search Function </h1>
      <div className="inputField">
        <form className="keywordInput" onSubmit={handleSubmit}>
          <input
            className="taskName"
            type="input"
            placeholder="Enter a Keyword"
            value={searchKey}
            onChange={handleInputChange}
          ></input>
          <button type="submit" className="searchButton">
            <img
              src={searchIcon}
              className="searchImage"
              alt="searchIcon"
            ></img>
          </button>
          <button type="submit" className="searchButton2">
            Search
          </button>
        </form>
      </div>
      <h3 className="description"> *Enter a keyword above to search photos from the unsplash API. </h3>

      <div className="logo">
        <img src={logo} className="logo" alt="searchIcon"></img>
      </div>
    </div>
  );
};

export default SearchForm;
