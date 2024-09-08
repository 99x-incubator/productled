import React from 'react';
import { Outlet } from 'react-router-dom';

const Page: React.FC = () => {
  return (
    <div>
      <h2>Page</h2>
      <button className='btn tooltip-me'>Tooltip Me</button>
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
}

export default Page;