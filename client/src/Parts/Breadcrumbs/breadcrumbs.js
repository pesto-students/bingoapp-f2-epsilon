import React from "react";
import { Breadcrumb } from "semantic-ui-react";

// const parts = window.location.pathname.split( '/' );

const breadcrumbsStyle = {
    textAlign : "left",
    padding : "12px 0",
}

const sections = [
    { key: "Home", content: "Home", link: "/" },
    { key: "Store", content: "Watch", link: "/watch" },
];


function Breadcrumbs() {
  return <div style={breadcrumbsStyle}>
  <Breadcrumb size="massive" icon="right angle" sections={sections} />
  
  </div>
}

export default Breadcrumbs;
