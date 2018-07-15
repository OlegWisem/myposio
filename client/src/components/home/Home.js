import React, { Component } from 'react';
import Navbar from '../layout/Navbar';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <h1>Home page</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
