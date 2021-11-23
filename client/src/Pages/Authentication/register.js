import React, { useState } from "react";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utilities/authContext";
import validator from "validator";

function Register() {
  const [formData, updateFormData] = useState();
  const { signup, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();

    if (!validator.isEmail(formData.email)) {
      return setError("Email is Invalid");
    }

    if (formData.password !== formData.confirm_password) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 8) {
      return setError("Password Must Be 8 Characters Long");
    }

    try {
      setError("");
      setLoading(true);
      await signup(formData.email, formData.password);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <div className="ui column centered" style={{ height: "75vh" }}>
      <Segment clearing inverted>
        <h1>
          Login to Stream{" "}
          <span className="highlight-text">
            <b>Unlimited Movies</b>
          </span>{" "}
        </h1>
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            {error && <Message error header={error} />}
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  type="password"
                  name="confirm_password"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Field>

              <Button disabled={loading} color="red" type="submit">
                Sign Up
              </Button>
            </Form>
            <Button primary onClick={signInWithGoogle}>
              <span> Continue with Google</span>
            </Button>
          </Grid.Column>
        </Grid>
        <h3>
          Already have an account?{" "}
          <Link to="/login">
            <span className="highlight-text">Log In</span>
          </Link>
        </h3>
      </Segment>
    </div>
  );
}

export default Register;
