import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Import Components
import Main from './Components/Main';
import Navbar from '../src/Components/Nav';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Buyer from './Components/Buyer';
import Traveller from './Components/Traveller';
import Chat from './Components/ChatBox/ChatBox';
import OrderPayment from './Components/OrderPayment';
import UserIndex from './Components/UserIndex';
import OrderDetails from './Components/OrderDetails'
import chatTest from './Components/ChatBox/chatTest'

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
        <Route path="/Chat" component={Chat} />
        <Route path="/OrderPayment" component={OrderPayment} />
        <Route path="/UserIndex" component={UserIndex} />
        <Route path="/OrderDetails" component={OrderDetails} />
        <Route path="/chatTest" component={chatTest} />
      </div>

    )
  }
}

export default App;
