import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Movies from "./Movies";
import MovieProfile from "./MovieProfile";
import Register from './register';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="movies">
        <Route path=":id" element={<MovieProfile />}></Route>
        <Route index element={<Movies />}></Route>
      </Route>
     </Routes>
    </div>
  );
}

export default App;
