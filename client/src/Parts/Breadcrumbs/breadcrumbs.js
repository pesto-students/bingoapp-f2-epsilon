import React from "react";
import { Breadcrumb } from "semantic-ui-react";

// const parts = window.location.pathname.split( '/' );

const breadcrumbsStyle = {
  textAlign: "left",
  padding: "12px 0",
};


function Breadcrumbs({data}) {
  const sections = [
    { key: "Home", content: "Home", link: true , href: "/" },
    { key: "Watch", content: "Watch", link: true , href: `/watch/${data._id}`},
    { key: data.name, content: data.name, link: false },
  ];
  return (
    <div style={breadcrumbsStyle}>
      <Breadcrumb size="massive" link={sections.redirect} icon="right angle" sections={sections} />
    </div>
  );
}

export default Breadcrumbs;
