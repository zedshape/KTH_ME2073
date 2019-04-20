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
            searchInput: ''
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
                      <input placeholder=' Search Here...' id='searchInput' className="form-control navSearch" onKeyDown={this.keyPress} onChange={this.handleChange}></input>
                      <NavbarToggler onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar>
                          <Nav className="ml-auto" navbar>
                              <NavItem>
                                  <NavLink href="/Buyer"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Buyer</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/Traveller"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Traveller</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/Chat"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Chat</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/UserIndex"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >{localStorage.getItem('email')}</button></NavLink>
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
                                  <NavLink href="/Buyer"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Buyer</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/Traveller"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Traveller</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/Chat"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Chat</button></NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink href="/SignIn"><button style={btnstyle} className="f6 dib bg-animate hover-bg-black hover-white pv2 ph4 br-pill ba b--black-20">Get Started!</button></NavLink>
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
