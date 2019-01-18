import React, { Component } from "react";

import Nav from '../Nav';
import Feed from '../Feed';

export default class App extends Component {
  constructor() {
    super();
    
  }

  render() {
    
    return (
      <div>
        <Feed/>
        <Nav/>
      </div>
    );
  }
}


