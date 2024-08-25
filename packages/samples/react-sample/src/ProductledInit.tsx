import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Productled } from '@productled/core';

const ProductledInit: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    Productled.getInstance().routeChanged();
  }, [location.pathname]);

  return null;
}

export default ProductledInit;
