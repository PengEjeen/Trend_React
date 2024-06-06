import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Post from "./Post";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="about">About</Link> | <Link to="post">Post</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/post" element={<Post />}></Route>

      </Routes>
    </div>
  );
}

export default App;