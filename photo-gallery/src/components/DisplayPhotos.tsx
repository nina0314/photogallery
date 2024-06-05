import React, { useEffect } from "react";
import "./styles.scss";
import { UseDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { findKeyword } from "../state/image/imageSlice";
import { useDispatch } from "react-redux";
import searchIcon from "../images/search.png";
import logo from "../images/logo.png";

const DisplayPhotos = () => {
  let images = useSelector((state: RootState) => state.image.images);
  let keyword = useSelector((state: RootState) => state.image.value);
  let page = useSelector((state: RootState) => state.image.page);
  let newImages: any;
  if (images.length !== 0) {
    newImages = images[0];
    newImages = newImages.results;
    console.log(newImages);
  } else {
    newImages = images;
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleScroll = () => {
      let documentHeight = document.getElementById("gallery")?.scrollHeight;
      let scrollTop = document.getElementById("gallery")?.scrollTop;
      let windowHeight = window.innerHeight;

      if (
        documentHeight !== undefined &&
        scrollTop !== undefined &&
        scrollTop + windowHeight >= documentHeight
      ) {
        dispatch(findKeyword({ keyword: keyword, page: page + 1 }));
      }
    };

    document
      .getElementById("gallery")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .getElementById("gallery")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, keyword, newImages, page]);

  return (
    <div className="photoGallery" id="gallery">
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
