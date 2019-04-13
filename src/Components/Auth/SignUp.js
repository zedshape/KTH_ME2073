import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../Actions/AuthActions'
import { Link } from "react-router-dom";

import { Collapse } from 'reactstrap'


class SignUp extends Component {

    state = {
        email: '',
        password: '',
        userName: '',
        phoneNumber: '',
        verficationCode: '',
        isOpen: false
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    handleGetCode = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { authError } = this.props;
        //if (auth.uid) return <Redirect to='/' />

        return (
            <div className="container avenir">
                <div className="Sign">
                    <form onSubmit={this.handleSubmit} className="">
                        <div className="input-field mt6">
                            <label htmlFor="email" className="db fw6 lh-copy f6">Email<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5 '
                                type="email"
                                id="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="password" className="db fw6 lh-copy f6">Password<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5'
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="userName" className="db fw6 lh-copy f6">User Name<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5'
                                type="text"
                                id='userName'
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="phoneNumber" className="db fw6 lh-copy f6">Phone Number<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5'
                                type="text"
                                id='phoneNumber'
                                onChange={this.handleChange}
                            />
                        </div>
                        <a className='f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black mt2' onClick={this.handleGetCode}>Get Verfication Code</a>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <div className="input-field mt3">
                                <label htmlFor="phoneNumber" className="db fw6 lh-copy f6">Verfication Code</label>
                                <input
                                    className='pa2 input-reset ba bg-transparent w5'
                                    type="text"
                                    id='phoneNumber'
                                    onChange={this.handleChange}
                                />

                            </div>
                        </Collapse>
                        <br /><br />
                        <div>
                            <button className="f6 bg-transparent no-underline grow dib v-mid ba b--black ph3 pv2 mb3">
                                Sign Up
                            </button>
                            <div className="center red">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    //console.log(state)
    return {
        //authError: state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)