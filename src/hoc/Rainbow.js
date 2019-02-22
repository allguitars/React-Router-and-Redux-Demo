import React from 'react';

// The higher order component will take in a component, attach some features, 
// and then return it as a supercharged component.

const Rainbow = (WrappedComponent) => {
  const colors = ['red', 'pink', 'blue', 'yellow', 'green', 'orange'];
  const randomColor = colors[Math.floor(Math.random() * 5)];

  // Material style format of class name
  const className = randomColor + '-text';

  // Return a function 
  // This function takes in the porps which would have been passed into WrappedComponent
  // And this function will return some JSX, and that JSX could just be the WrappedComponent
  // or we can surround that WrappedComponent with other JSX.

  return (props) => { // Returning a function. props comes from the WrappedComponent
    return (
      <div className={className}>
        {/* Pass the props into WrappedComponent again */}
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export default Rainbow;