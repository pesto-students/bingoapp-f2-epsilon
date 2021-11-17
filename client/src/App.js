import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage  from "./Pages/HomePage/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
