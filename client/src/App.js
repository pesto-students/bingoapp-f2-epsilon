import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/login";
import Register from "./Pages/Authentication/register";
import SingleHeader from "./Parts/Header/header";
import HomePage from "./Pages/HomePage/homePage";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <SingleHeader />
        {/* <div className="ui hidden section divider"> */}
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
          </Routes>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
