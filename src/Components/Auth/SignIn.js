import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../Actions/AuthActions'
import { Link } from "react-router-dom";


class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signIn(this.state);
    }
    render() {
        const { authError, auth } = this.props;
        //if (auth.uid) return <Redirect to='/' />
        let signUp = <Link to="/SignUp">Sign Up</Link>;

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
                        </div><br />
                        <div>
                            <button className="f6 bg-transparent no-underline grow dib v-mid ba b--black ph3 pv2 mb3">
                                Sign In
                            </button>
                            <h5 className="mt1 f6">
                                Don't have an account? {signUp}
                            </h5>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)