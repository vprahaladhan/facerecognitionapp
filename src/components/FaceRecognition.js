import React from "react";
import "../styles/FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  const style = {
    display: imageUrl ? "flex" : "none",
    position: "relative",
    justifyContent: "center"
  };

  return (
    <div className="center ma2" style={style}>
      <div className="input_image">
        <img
          className="input_image"
          id="clarifai_image"
          src={imageUrl}
          alt="face-determination"
        />

        {boxes.map(box => (
          <div
            className="bounding-box"
            style={{
              top: box.top_row,
              right: box.right_col,
              bottom: box.bottom_row,
              left: box.left_col
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
