import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../Actions/AuthActions'
import UsersService from '../../UsersService'
import { Link } from "react-router-dom";


const  usersService  =  new UsersService();

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
    handleGet = () => {

        usersService.getUser(
          this.refs.email.value
        ).then((result)=> {
          console.log(this.refs.password.value, result.password)
          if(this.refs.password.value === result.password ) {
            localStorage.setItem('login', true);
            localStorage.setItem('name', result.name);
            localStorage.setItem('id', result.id);
            localStorage.setItem('email', result.email);
            this.setState({"redirect": true, "name":result.name, "email":result.email})
          } else {
            alert('ID or PASSWORD is WRONG.');
          }
        }).catch((error)=>{
                alert('There was an error! Please re-check your form.');
        });
    }
    handleSubmit = (e) => {
      const { match: { params } } =  this.props;
      this.handleGet();

      e.preventDefault();
      console.log(this.state);
      this.props.signIn(this.state);
    }
    render() {
        const { authError, auth } = this.props;
        //if (auth.uid) return <Redirect to='/' />
        if (this.state.redirect) {
          return (<Redirect to={{
                pathname: this.props.location.afterpath,
                state: { name: this.state.name,
                        email: this.state.email,
                          newuser: 'Yes',
                          loggedin: 'Yes'}
            }}
          />)
        }

        if(localStorage.getItem('login') == "true") {
          return (<Redirect to={{
                pathname: this.props.location.afterpath,
                state: { name: this.state.name,
                        email: this.state.email,
                          newuser: 'Yes',
                          loggedin: 'Yes'}
            }}
          />)
        }
        let signUp = <Link to="/SignUp">Sign Up</Link>;

        return (
            <div>
              <div className='showing'>
                Welcome back!
              </div>
              <div className='mt5'>
              <h2>To use our <span className="fly2u">FLY2U</span> service, you need to login with your account!</h2>
              </div>
                <div className="Sign white-box">
                    <form onSubmit={this.handleSubmit} className="">
                        <div className="input-field mt1">
                            <label htmlFor="email" className="db fw6 lh-copy f6">Email<br /></label>
                            <input
                                className='pa2 input-reset ba w5 '
                                type="email"
                                id="email"
                                ref="email"
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="password" className="db fw6 lh-copy f6">Password<br /></label>
                            <input
                                className='pa2 input-reset ba w5'
                                type="password"
                                id="password"
                                ref="password"
                                required
                                onChange={this.handleChange}
                            />
                        </div><br />
                        <div>
                            <button className="btn btn-primary f6 no-underline grow dib v-mid ba b--black ph3 pv2 mb3">
                                Sign In
                            </button>
                            <h5 className="mt1 f6">
                                Don't have an account? {signUp}
                            </h5>
                            <h5 className="mt1 f6">
                                Test account: test@test.com / tester
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
