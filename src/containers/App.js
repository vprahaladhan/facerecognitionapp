import React, { useRef } from "react";
import "../styles/App.css";
import Clarifai from "clarifai";
import Logo from "../components/Logo";
import Rank from "../components/Rank";
import { connect } from "react-redux";
import Particles from "react-particles-js";
import Signin from "../components/Signin";
import Navigation from "../components/Navigation";
import ImageLinkForm from "../components/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition";
import { setSearchText, setCurrentPage } from "../actions/actions.js";
import Signup from "../components/Signup";

const params = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
};

const app = new Clarifai.App({
  apiKey: "8a22eaa7fdd64038a6ef124260bd1235"
});

function App({ searchText, setSearchText, currentPage, setCurrentPage }) {
  const imageUrl = useRef(null);
  const boxes = useRef([])

  const detectFaceLocations = data => {
    const regions = data.outputs[0].data.regions
    const image = document.getElementById("clarifai_image")
    const width  = Number(window.getComputedStyle(image).width.slice(0, -2) )
    const height = Number(window.getComputedStyle(image).height.slice(0, -2))
    boxes.current = []

    regions.forEach(region => {
      const boundingBox = region.region_info.bounding_box  
      boxes.current.push({
        top_row: boundingBox.top_row * height,
        bottom_row: height - (boundingBox.bottom_row * height),
        left_col: boundingBox.left_col * width,
        right_col: width - (boundingBox.right_col * width)
      })        
    });

    setSearchText('')
  };

  const onSubmit = () => {
    imageUrl.current = searchText;

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, searchText)
      .then(response => detectFaceLocations(response))
      .catch(error => console.log("Error >> ", error));
  };

  const onSignin = (event) => {
    event.preventDefault()
    setCurrentPage('signedin')
  }

  const onSignup = (event) => {
    event.preventDefault()
    setCurrentPage('signin')
  }

  return (
    <div className="App">
      <Particles params={params} className="particles" />
      <Navigation onSignout={() => setCurrentPage('signin')} />
      <Logo />
      <div style={{display: currentPage === 'signin' ? 'block' : 'none'}}>
        <Signin onSignin={onSignin} onSignup={() => setCurrentPage('signup')} />
      </div>
      <div style={{display: currentPage === 'signup' ? 'block' : 'none'}}>
        <Signup onSignup={onSignup} />
      </div>
      <div style={{display: currentPage === 'signedin' ? 'block' : 'none'}}>
        <Rank />
        <ImageLinkForm
          searchText={searchText}
          setSearchText={setSearchText}
          onSubmit={onSubmit}
        />
        <FaceRecognition imageUrl={imageUrl.current} boxes={boxes.current} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  searchText: state.search.searchText,
  currentPage: state.page.currentPage
});

const mapDispatchToProps = {
  setSearchText,
  setCurrentPage
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
