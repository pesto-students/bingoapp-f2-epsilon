import React from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="ui column centered">
      <Segment clearing inverted>
        <h1>
          Login to Stream{" "}
          <span className="highlight-text">
            <b>Unlimited Movies</b>
          </span>
        </h1>
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Form>
              <Form.Field>
                <Form.Input
                  name="username"
                  placeholder="Username"
                  className="ui transparent"
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Form.Field>

              <Button color="red" type="submit">
                Log In
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
        <h3>
          Don't have an account?{" "}
          <Link to="/register">
            <span className="highlight-text"> Sign Up</span>
          </Link>
        </h3>
      </Segment>
    </div>
  );
}

export default Login;
