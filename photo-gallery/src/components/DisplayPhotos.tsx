import React from "react";
import "./styles.scss";
import { UseDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { findKeyword } from "../state/image/imageSlice";
import { useDispatch } from "react-redux";
import searchIcon from "../images/search.png";
import logo from "../images/logo.png";

const DisplayPhotos = () => {
  let images = useSelector((state: RootState) => state.image.images);
  let newImages: any;
  console.log(images);
  if (images[0] !== "") {
    newImages = images[0];
    newImages = newImages.results;
  } else {
    newImages = [];
  }
  console.log(newImages);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="photoGallery">
      {newImages.length >= 1 ? (
        newImages.map((image: any) => (
          <div className="photoGalleryPadding">
            <img
              className="photoGalleryImage"
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
            />
            <h3 className="photoGalleryDescription"> {image.description} </h3>
          </div>
        ))
      ) : (
        <h1 className="noImagesTitle"> No images to display </h1>
      )}
    </div>
  );
};

export default DisplayPhotos;
