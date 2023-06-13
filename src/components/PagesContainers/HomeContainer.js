import React, { Component } from 'react';
import {Home} from '../Pages/Home/Home'

class HomeContainer extends Component {
  state = {
    contacts: [],
  }
  
  render() {
    return (
      <div>
        <h2>Home Container</h2>
        <Home/>
      </div>
    );
  }
};

export default HomeContainer;
