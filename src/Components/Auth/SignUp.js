import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../Actions/AuthActions'

import UsersService from '../../UsersService'
import { Link } from "react-router-dom";

import { Collapse } from 'reactstrap'

const  usersService  =  new UsersService();
class SignUp extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        email: '',
        password: '',
        userName: '',
        phoneNumber: '',
        verficationCode: '',
        isOpen: false
    }
    // handleUpdate = (pk) => {
    //   customersService.updateCustomer(
    //       {
    //       "pk":  pk,
    //       "name":  this.refs.name.value,
    //       "email":  this.refs.email.value,
    //       "phone":  this.refs.phone.value,
    //       }
    //       ).then((result)=>{
    //
    //           alert("Customer updated!");
    //       }).catch(()=>{
    //           alert('There was an error! Please re-check your form.');
    //       });
    //   }
    handleCreate = () => {
      usersService.createUser(
        {
        "name":  this.refs.name.value,
        "email":  this.refs.email.value,
        "password": this.refs.password.value,
        "phone":  this.refs.phone.value
        }).then((result)=>{
          localStorage.setItem('login', true);
          localStorage.setItem('name', this.refs.name.value);
          localStorage.setItem('name', this.refs.email.value);
          this.setState({"redirect": true})

        }).catch((error)=>{
                alert('There was an error! Please re-check your form.');
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
      if(!this.state.isOpen) {
        alert("Please verify your phone number first")
        e.preventDefault();
        return;
      }
      const { match: { params } } =  this.props;
      if(params  &&  params.pk){
          this.handleUpdate(params.pk);
      }
      else
      {
          this.handleCreate();
      }
      e.preventDefault();
    }

    handleGetCode = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { authError } = this.props;
        //if (auth.uid) return <Redirect to='/' />
        if (this.state.redirect) {
          return (<Redirect to={{
                pathname: '/UserIndex',
                state: { name: this.refs.name.value,
                        email: this.refs.email.value,
                          newuser: 'Yes',
                          loggedin: 'Yes'}
            }}
          />)
        }
        return (
            <div>
            <div className='showing'>
              Join our nice journey!
            </div>
                <div className="Sign white-box mb5">
                    <h2>Welcome to our <span className="fly2u">FLY2U</span> service!</h2><h5> Premium low-cost transportation service using reliable airline. <br/> Please fill out the form below to sign up.</h5>
                    <form onSubmit={this.handleSubmit} className="mt4">
                        <div className="input-field">
                            <label htmlFor="email" className="db fw6 lh-copy f6">Email<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5 '
                                type="email"
                                id="email"
                                ref="email"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="password" className="db fw6 lh-copy f6">Password<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5'
                                type="password"
                                id="password"
                                ref="password"
                                minlength="8"
                                maxlength="16"
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="userName" className="db fw6 lh-copy f6">User Name<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5'
                                type="text"
                                id='userName'
                                ref="name"
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="phoneNumber" className="db fw6 lh-copy f6">Phone Number<br /></label>
                            <input
                                className='pa2 input-reset ba bg-transparent w5'
                                type="text"
                                id='phoneNumber'
                                ref='phone'
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <a className='f6 grow pointer no-underline br-pill ba ph3 pv2 mb2 dib black mt2' onClick={this.handleGetCode}>Get Verfication Code</a>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <div className="input-field mt3">
                                <label htmlFor="verificationNumber" className="db fw6 lh-copy f6">Verfication Code</label>
                                <input
                                    className='pa2 input-reset ba bg-transparent w5'
                                    type="text"
                                    id='verificationNumber'
                                    ref='verification'
                                    value='123456'
                                    onChange={this.handleChange}
                                    required
                                /><span className="green">&nbsp;&nbsp;Verified!</span>

                            </div>
                        </Collapse>
                        <br /><br />
                        <div>

                            <input type='submit' value='Join!' className="btn btn-primary f6 no-underline grow dib v-mid ba b--black ph3 pv2 mb3" />
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
