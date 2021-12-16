import React, { useState } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Message,
  Icon,
  Dropdown,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utilities/authContext";
import { headerOptions } from "../../Utilities";
import SearchBar from "../../Components/SearchBar/searchBar";

function SingleHeader() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <Segment clearing inverted>
        <Container>
          <Link to="/">
            <Header size="huge" id="logo-font" inverted floated="left">
              BINGO
            </Header>
          </Link>
          {currentUser ? (
            <Header size="small" inverted floated="left">
              <Header.Content className="flex">
                <Dropdown text="Categories" className='invisible' options={headerOptions} />
                <SearchBar />
              </Header.Content>
            </Header>
          ) : (
            ""
          )}
          <Header size="medium" floated="right">
            {error && <Message error header={error} />}
            <div className="flex">
              {currentUser ? (
                <>
                  <Button
                    variant="link"
                    className="logoutbtn"
                    onClick={handleLogout}
                  >
                    Log Out <Icon name="sign out" />
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Link to="/login">
                      <span className="rscontent">Log In</span>{" "}
                      <Icon className="rsicon" name="sign in" />
                    </Link>
                  </div>
                  <div>
                    <Link to="/register">
                      <span className="rscontent">Sign Up</span>{" "}
                      <Icon className="rsicon" name="signup" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </Header>
        </Container>
      </Segment>
    </div>
  );
}

export default SingleHeader;
