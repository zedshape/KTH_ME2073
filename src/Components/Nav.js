import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class CNavbar extends Component {
    static propTypes = {
        //   isFetching: PropTypes.string.isRequired,
        //   games: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchInput: '',
            avatars: ['http://tachyons.io/img/avatar-yavor.jpg',
                      'http://mrmrs.cc/photos/p/5.jpg',
                      'http://mrmrs.cc/photos/p/4.jpg',
                      "http://tachyons.io/img/avatar_1.jpg",
                      'http://tachyons.io/img/avatar-jasonli.jpg',
                      'http://tachyons.io/img/avatar-jxnblk.jpg',
                      'http://mrmrs.cc/photos/p/1.jpg',
                      'http://tachyons.io/img/avatar-mrmrs.jpg',
                      'http://mrmrs.cc/photos/p/7.jpg',
                      'http://mrmrs.cc/photos/p/3.jpg',
                      'http://mrmrs.cc/photos/p/2.jpg',
                      'http://mrmrs.cc/photos/p/11.jpg',
                      'http://mrmrs.cc/photos/p/10.jpg',
                      'http://mrmrs.cc/photos/p/9.jpg',
                      'http://mrmrs.cc/photos/p/8.jpg',
                      'http://mrmrs.cc/photos/p/6.jpg'
                    ]
        };
    }

    componentDidMount() {

    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    logout = () => {
      localStorage.clear()
      this.setState({ redirect: true });
    }
    handleChange = (e) => {
        this.setState({ searchInput: e.target.value });
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            console.log('searchInput', e.target.value);
        }
    }
    render() {
        if (this.state.redirect) {

        }
        let btnstyle = {
            outline: 0
        }
        if(localStorage.getItem('login')=== "true") {
          return (
              <div>
                  <Navbar color="white" light expand="md">
                      <NavbarBrand className="nbb" href="/">FLY2U</NavbarBrand>
                      <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar>
                          <Nav className="ml-auto" navbar>
                              <NavItem>
                                  <NavLink href="/Buyer"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Buyer</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/Traveller"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Traveler</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/Chat"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Chat</button></NavLink>
                              </NavItem>

                              <NavItem>

                                  <NavLink href="/UserIndex"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 dib mid-gray bg-transparent bn" >
                                  <img src={this.state.avatars[localStorage.getItem('id')%16]} class="br-100 h2 w2 dib" title="Service Provider" />&nbsp; {localStorage.getItem('email')}</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/"><button onClick={this.logout} style={btnstyle} className="f6 dib bg-animate hover-bg-black hover-white pv2 ph4 br-pill ba b--black-20">Log Out</button></NavLink>
                              </NavItem>
                          </Nav>
                      </Collapse>
                  </Navbar>
              </div>
          );
        } else {
          return (
              <div>
                  <Navbar color="white" light expand="md">
                      <NavbarBrand className="nbb" href="/">FLY2U</NavbarBrand>
                      <input placeholder=' Search Here...' id='searchInput' className="form-control navSearch" onKeyDown={this.keyPress} onChange={this.handleChange}></input>
                      <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar>
                          <Nav className="ml-auto" navbar>
                              <NavItem>
                                  <Link to="/Buyer"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Buyer</button></Link>
                              </NavItem>
                              <NavItem>
                                  <Link to={{pathname:"/SignIn", afterpath: "/Traveller"}}><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Traveller</button></Link>
                              </NavItem>
                              <NavItem>
                                  <Link to={{pathname:"/SignIn", afterpath: "/Chat"}}><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Chat</button></Link>
                              </NavItem>
                              <NavItem>
                                  <Link to={{pathname:"/SignIn", afterpath: "/UserIndex"}}><button style={btnstyle} className="f6 dib bg-animate hover-bg-black hover-white pv2 ph4 br-pill ba b--black-20">Get Started!</button></Link>
                              </NavItem>
                          </Nav>
                      </Collapse>
                  </Navbar>
              </div>
          );
        }

    }
}

export default CNavbar;
