import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Spotlights } from '@productled/activation';
import { spotlights } from './ProductledConf';

const Productled: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    Spotlights.applyEffects();
  }, []);

  Spotlights.add(spotlights);

  return null;
}

export default Productled;
