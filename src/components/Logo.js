import React from "react";
import Tilt from 'react-tilt'
import '../styles/Logo.css'
import brain from '../images/brain-100.png'

const Logo = props => {
  return (
    <div className="ma4 mt0">
    <Tilt className="Tilt br-2 shadow-2" options={{ max : 50 }} style={{ height: 100, width: 100 }} >
      <div className="Tilt-inner">
        <img style={{paddingTop: "5px"}} src={brain} alt="logo" />
      </div>
    </Tilt>
    </div>
  );
};

export default Logo;
