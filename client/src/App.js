import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/login";
import Register from "./Pages/Authentication/register";
import SingleHeader from "./Parts/Header/header";
import Footer from "./Parts/Footer/footer";
import HomePage from "./Pages/HomePage/homePage";
import MovieDetailPage from "./Pages/MovieDetailPage/movieDetailPage";
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
          <Route exact path="/watch" element={<MovieDetailPage />} />
        </Routes>
        {/* </div> */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
