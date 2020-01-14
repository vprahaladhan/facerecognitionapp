import React from "react";

const Navigation = ({ onSignout }) => (
  <nav style={{ display: "flex", justifyContent: "flex-end" }}>
    <p className="f3 dim link black underline pa3 pointer" onClick={onSignout}>Sign Out</p>
  </nav>
);

export default Navigation;
