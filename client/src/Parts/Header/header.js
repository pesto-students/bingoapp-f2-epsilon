import React, { useState } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Message,
  Icon,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utilities/authContext";

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
              Bingo
            </Header>
          </Link>
          <Header size="medium" floated="right">
            {error && <Message error header={error} />}
            <div className="flex">
              {currentUser ? (
                <>
                  <Button variant="link" onClick={handleLogout}>
                    Log Out <Icon name="sign out" />
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Link to="/login">
                      Log In <Icon name="sign in" />
                    </Link>
                  </div>
                  <div>
                    <Link to="/register">
                      Sign Up <Icon name="signup" />
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
