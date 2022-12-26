import React, { useState, useRef, useEffect } from "react";
import Airtable from "airtable";
import axios from "axios";
import "../styles/imageuploader.css";

function Imageuploader() {
  const [image, setImage] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInput = useRef(null);

  // const url =
  //   "https://api.airtable.com/v0/appmXYI23Z1eZQ9WX/Table%201?api_key=keyXCNzCxU3ExYOiV";

  new Airtable({ apiKey: "keyXCNzCxU3ExYOiV" }).base("appmXYI23Z1eZQ9WX");
  axios.defaults.baseURL =
    "https://api.airtable.com/v0/appmXYI23Z1eZQ9WX/Table%201?api_key=keyXCNzCxU3ExYOiV";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers["Authorization"] = "Bearer keyXCNzCxU3ExYOiV";

  const Imagedata = [{}]
  useEffect(() => {
    const response = axios
      .post(
        "https://api.airtable.com/v0/appmXYI23Z1eZQ9WX/Table%201?api_key=keyXCNzCxU3ExYOiV", Imagedata
      )
      .then((res) => console.log(res.data));
  }, [image]);

  const handleFile = (file) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleOndragOver = (event) => {
    event.preventDefault();
  };

  const handleOndrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };
  return (
    <div className="wrapper">
      <div
        className="drop_zone"
        onDragOver={handleOndragOver}
        onDrop={handleOndrop}
        onClick={() => fileInput.current.click()}
      >
        <p>Click to select or Drag and drop image here....</p>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
      {previewUrl && (
        <div className="selected--image">
          <div className="image">
            <img src={previewUrl} alt="image" />
            {image.name}
          </div>
          <button className="btn--run">Run</button>
        </div>
      )}
    </div>
  );
}

export default Imageuploader;
