import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
function SingleHeader() {
  return (
    <div>
      <Segment clearing inverted>
        <Container>
          <Link to="/">
            <Header size="huge" id="logo-font" inverted floated="left">
              Bingo
            </Header>
          </Link>
          <Header size="medium" floated="right">
            <div className="flex">
              <div>
                <Link to="/login">Log In </Link>
              </div>
              <div>
                <Link to="/register"> Sign Up</Link>
              </div>
            </div>
          </Header>
        </Container>
      </Segment>
    </div>
  );
}

export default SingleHeader;
