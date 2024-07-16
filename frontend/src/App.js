import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import MyRecipes from './components/MyRecipes';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path='/my-recipes' element={<MyRecipes />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
