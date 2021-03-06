import React, { useState } from "react";
import { Button, Form, Grid, Segment, Message } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utilities/authContext";

function Login() {
  // const [formData, updateFormData] = useState();
  const [email, setEmail] = useState("pesto@pesto.tech");
  const [password, setPassword] = useState("pesto@");
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   updateFormData({
  //     ...formData,

  //     // Trimming any whitespace
  //     [e.target.name]: e.target.value.trim(),
  //   });
  // };
  const changeEmail = (e) =>{
    setEmail(e.target.value);
  }

  const changePassword = (e) =>{
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const data = await login(email,password);
      localStorage.setItem("auth_token", data.user.ya);
      navigate("/", { replace: true });
    } catch {
      setError("Email or Password is Incorrect");
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
          </span>
        </h1>
        <Grid centered>
          <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
            {error && <Message error header={error} />}
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={email} 
                  className="ui transparent"
                  onChange={changeEmail}
                  required
                />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  type="password"
                  name="password"
                  defaultValue={password} 
                  placeholder="Password"
                  onChange={changePassword}
                  required
                />
              </Form.Field>

              <Button
                disabled={loading}
                data-testid="login"
                color="red"
                type="submit"
              >
                Log In
              </Button>
            </Form>
            <Button primary onClick={signInWithGoogle}>
              <span> Continue with Google</span>
            </Button>
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
