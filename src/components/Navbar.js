import React from 'react';
// For the page to not reload every time we click the navbar, and instead we just 
// want the react to refresh the component, we can use the following modules.
import { Link, NavLink, withRouter } from 'react-router-dom';
// withRouter is a higher-order component.

const Navbar = (props) => {
  // Result --> Navbar.js:11 Uncaught TypeError: Cannot read property 'push' of undefined
  // push() is undefined because the Navbar component in App.js is not wrapped in a Route.
  // BrowserRouter will not add any extra information in the props so there is no 
  // history object. If you log the props here in the console, it will be an empty object.
  // This can be solved with the higher-order component.
  // A higher-order component is something that basically wraps another component and gives
  // it extra powers.
  // setTimeout(() => {
  //   props.history.push('/about');
  // }, 2000);

  // console.log(props); // props will be an empty object.
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <a className="brand-logo">Advantech Times</a>
        <ul className="right">
          {/* Let React take over the linking duty.
          The Link tag will prevent the default action of going out and making a request
          to the server, and causing the page to reload. */}
          <li><Link to="/">Home</Link></li>
          {/* With Navlink tag, React applies the 'active' class to the link that is actve.
          It's useful when we want to apply some style to the active link. */}
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

// Wrap the Navbar component with the higher-order component, withRouter.
// This higher-order component is supercharging Navbar and apply the properties realted 
// to the Routes to the props.
export default withRouter(Navbar);
