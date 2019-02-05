import React from 'react';

// If we take in the 'props' right here, we have automatically added to the props a 
// 'router' information, and that's because this is one of the components that the
// router loads up.
// For any component that the Router does load up, like Home, About, and Contact components,
// the Router attaches some extra information to the props object.
const Contact = (props) => {
  setTimeout(() => {
    props.history.push('/about'); // Pass in the link to push() that you want to redirect to.
  }, 2000); // Wait for 2 sec and redirect to the About page.

  return (
    <div className="container">
      <h4 className="center">Contact</h4>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime doloremque nihil harum consequatur labore, itaque voluptatem eveniet maiores, fugiat perferendis laborum officiis quod qui. Earum fugiat enim error illo amet!</p>
    </div>
  );
};

export default Contact;
