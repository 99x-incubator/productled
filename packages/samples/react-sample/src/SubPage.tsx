import React from 'react';

const SubPage: React.FC = () => {
  return (
      <div>
        <h2>SubPage</h2>
        <div>
          <p >This is a sub-page.</p>
          <div className='content'></div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, nunc id aliquet lacinia, nisl justo lacinia nunc, id lacinia lectus nisl in nunc. Sed auctor, nunc id aliquet lacinia, nisl justo lacinia nunc, id lacinia lectus nisl in nunc.</p>
          <p>Donec auctor, nunc id aliquet lacinia, nisl justo lacinia nunc, id lacinia lectus nisl in nunc. Sed auctor, nunc id aliquet lacinia, nisl justo lacinia nunc, id lacinia lectus nisl in nunc.</p>
        </div>
        <button className='btn spot-me'>Click Me</button>
      </div>
    );
}

export default SubPage;