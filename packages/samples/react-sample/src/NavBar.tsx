
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Spotlights, Flow } from '@productled/activation';
import './NavBar.css'; // Import the CSS file
import { spotlights } from './ProductledConf';


const NavBar: React.FC = () => {

  useEffect(() => {
    Spotlights.applyEffects();
  }, [useLocation()]);

  Spotlights.add(spotlights);

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