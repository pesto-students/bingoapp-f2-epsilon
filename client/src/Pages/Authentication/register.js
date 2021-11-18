import React from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

function Register() {
  return (
    <div className="ui column centered">
      <Segment clearing inverted>
        <h1>
          Login to Stream{" "}
          <span className="highlight-text">
            <b>Unlimited Movies</b>
          </span>{" "}
        </h1>
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            <Form>
              <Form.Field>
                <Form.Input name="email" placeholder="Email" />
              </Form.Field>
              <Form.Field>
                <Form.Input name="username" placeholder="Username" />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                />
              </Form.Field>

              <Button color="red" type="submit">
                Sign Up
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}

export default Register;
