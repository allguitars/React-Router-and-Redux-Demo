import React from 'react';
import Rainbow from '../hoc/Rainbow';

const About = () => {
  return (
    <div className="container">
      <h4 className="center">About</h4>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime doloremque nihil harum consequatur labore, itaque voluptatem eveniet maiores, fugiat perferendis laborum officiis quod qui. Earum fugiat enim error illo amet!</p>
    </div>
  );
};

// Wrap the About component with our own custom Higher Order function, Rainbow.
export default Rainbow(About);
