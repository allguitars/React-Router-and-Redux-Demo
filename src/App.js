import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Post from './components/Post';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      // Wrap the entire applicaion inside return() with <BrowserRouter> tag
      // Setting the BrowserRouter so the application inside can use Route.
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            {/* Load the routes after the Navbar component. */}
            {/* Whenever a user goes to certain route, then load in that component here in this position. */}
            <Route exact path='/' component={Home} /> {/* The route for Home component has to be exact path equal to '/' */}
            <Route path='/about' component={About} />
            {/* For any component that the Router does load up, like Home, About, and 
            Contact components, the Router attaches some extra information to the 
            props object. */}
            <Route path='/contact' component={Contact} />
            <Route path='/:post_id' component={Post} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
