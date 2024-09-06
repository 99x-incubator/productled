import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Page from './Page'; // Import the existing page component
import HomePage from './HomePage'; // Import another page component (create this if it doesn't exist)
import SubPage from './SubPage'; // Import the sub-page component (create this if it doesn't exist)
import NavBar from './NavBar';

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
      <NavBar /> {/* Use the NavBar component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page" element={<Page />}>
            <Route path="subpage/*" element={<SubPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;