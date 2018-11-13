import React, { Component } from 'react';
import Navbar from './Navbar.js'
import Content from './Content.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <Content>Content</Content>
      </div>
    );
  }
}

export default App;
