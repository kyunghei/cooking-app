import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import MyRecipes from './components/MyRecipes';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />

        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path='/my-recipes' element={<MyRecipes />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
