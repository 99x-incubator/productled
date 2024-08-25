
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file


const NavBar: React.FC = () => {

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page">Page</Link>
        </li>
        <li>
          <Link to="/page/subpage">SubPage</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;