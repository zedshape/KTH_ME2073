import React, { Component } from "react";
import PropTypes from "prop-types";
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

    handleChange = (e) => {
        this.setState({ searchInput: e.target.value });
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            console.log('searchInput', e.target.value);
        }
    }
    render() {
        let btnstyle = {
            outline: 0
        }
        return (
            <div className='avenir'>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">FLY2U</NavbarBrand>
                    <input placeholder=' Search Here...' id='searchInput' onKeyDown={this.keyPress} onChange={this.handleChange}></input>
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
                                <NavLink href="/SignIn"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Sign In</button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/Chat"><button style={btnstyle} className="f5 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib mid-gray bg-transparent bn" >Chat</button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/SignUp"><button style={btnstyle} className="f6 dib bg-animate hover-bg-black hover-white pv2 ph4 br-pill ba b--black-20">Sign Up</button></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/UserIndex"><button style={btnstyle} className="f6 dib bg-animate hover-bg-black hover-white pv2 ph4 br-pill ba b--black-20">User</button></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default CNavbar;
