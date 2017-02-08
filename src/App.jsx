import React, { Component } from 'react';
import Footer from './components/Footer/footer';
import Nav from './components/Nav/nav';
import Content from './components/Content/content';
import './index.css';

/** Main application object */
class App extends Component {

/**
  * Render method for main application component
  *
  * @return {object} Return the main application object
  */
  render() {
    return (
      <div>
        <Nav />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
