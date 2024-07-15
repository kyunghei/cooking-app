import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
