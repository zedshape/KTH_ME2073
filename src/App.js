import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Import Components
import Main from './Components/Main';
import Navbar from '../src/Components/Nav';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Buyer from './Components/Buyer';
import Traveller from './Components/Traveller';

import './Styles/App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "FLY2U"
    };
  }

  render() {
    return (

      <div className="App">
      <Navbar/>
        <Route exact path="/" component={Main} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Buyer" component={Buyer} />
        <Route path="/Traveller" component={Traveller} />
      </div>

    )
  }
}

export default App;
