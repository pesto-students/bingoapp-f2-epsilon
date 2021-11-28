import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/login";
import Register from "./Pages/Authentication/register";
import SingleHeader from "./Parts/Header/header";
import Footer from "./Parts/Footer/footer";
import HomePage from "./Pages/HomePage/homePage";
import MovieDetailPage from "./Pages/MovieDetailPage/movieDetailPage";
import VideoPlayerPage from "./Pages/videoPlayer/videoPlayerPage";
import SearchPage from "./Pages/Search/SearchPage";
import { AuthProvider } from "./Utilities/authContext";
import AuthRoute from "./Utilities/authRoute";
import UnauthenticatedRoute from "./Utilities/unauthenticatedRoute";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  console.log('location',window.location)
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <SingleHeader />
          {/* <div className="ui hidden section divider"> */}
          <Routes>
            <Route
              exact
              path="/login"
              element={
                <UnauthenticatedRoute>
                  <Login />
                </UnauthenticatedRoute>
              }
            />
            <Route
              exact
              path="/Register"
              element={
                <UnauthenticatedRoute>
                  <Register />
                </UnauthenticatedRoute>
              }
            />

            <Route
              exact
              path="/"
              element={
                <AuthRoute>
                  <HomePage />
                </AuthRoute>
              }
            />
            <Route
              exact
              path="/videos/:videoSlug"
              element={
                <AuthRoute>
                  <VideoPlayerPage />
                </AuthRoute>
              }
            />
            <Route
              exact
              path="/search"
              element={
                <AuthRoute>
                  <SearchPage />
                </AuthRoute>
              }
            />
            <Route
              exact
              path="/watch/:videoId"
              element={
                <AuthRoute>
                  <MovieDetailPage />
                </AuthRoute>
              }
            />
          </Routes>
          {/* </div> */}
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
