import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";

import UsersService from '../UsersService'
import TravelsService from '../TravelsService'
const  travelsService  =  new TravelsService();
const  usersService  =  new UsersService();

class OrderPayment extends Component {
    static propTypes = {
        //   isFetching: PropTypes.string.isRequired,
        //   games: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
          history: [],
          users: [],
          weight: 0,
          redirect: false
        };
        travelsService.getUsers().then((result)=> {
          this.setState({history:result.data})
        }).catch((error)=>{
                alert('There was an error! Please re-check your form.');
        });
        usersService.getUsers(
        ).then((result)=> {
          this.setState({users:result.data})
        });
    }
    handleChange = (id) => {
      travelsService.updateUser({id:id,
        status:1,
        requester: localStorage.getItem('email'),
        price:this.refs.ew.value*localStorage.getItem('price')})
      .then((result)=> {
        console.log("done");
        this.setState({"redirect": true})
      }).catch((error)=>{
              alert('There was an error! Please re-check your form.');
      });
    }
    handleInputChange = (e) => {
      // console.log(e.target.value)
      this.setState({weight: e.target.value})
    }
    componentDidMount() {

    }

    render() {

      if (this.state.redirect) {
        return (<Redirect to={{
              pathname: "/Buyer"
          }}
        />)
      }

      let searchResults = this.state.history.map((quote) => {
        // console.log(quote.id, this.props.location.id)
        if(quote.id == this.props.location.id) {

          var name = "";
          var email = "";

          this.state.users.map((user) => {
            if (user.id == quote.user) {
              name = user.name;
              email = user.email;
              localStorage.setItem('price', quote.estimatedPrice);
            }
          })

          return (
            <div className="mt6 mb6 white-box">
              <h5>Order Number: {this.props.location.id}</h5>
              <div class="tc">
              <img src="http://tachyons.io/img/avatar_1.jpg" class="br-100 h3 w3 dib" title="Service Provider"/>
                  <h1 class="f5">{email}, {name}</h1>
                  <hr class="mw3 bb bw1 b--black-10" />
              </div>
              <h3>Type your estimated weight and calculate estimated price!</h3>
              <p class="f4">Estimated weight:&nbsp;&nbsp;
              <input id="estimatedweight" type="number" max={quote.availableSpace} ref="ew" onChange={this.handleInputChange} required></input>
              &nbsp;&nbsp;(Max weight: {quote.availableSpace})
              </p>
              <p class="f4">Price: {this.state.weight * quote.estimatedPrice} ({quote.estimatedPrice} SEK/kg)</p>
              <p class="f4">From: {quote.arrival}</p>
              <p class="f4">To: {quote.departure}</p>
              <p class="f4">Flight Time: {quote.startTime} - {quote.endTime}</p>
              <button onClick={() => this.handleChange(this.props.location.id)} className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Confirm to Pay</button>&nbsp;&nbsp;
              <Link to='/Chat'><button className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Contact</button></Link>
          </div>

          )
        }
      });

        return (
            <div>
              <div className='showing'>
                Almost done!
              </div>
              <div class="mt4">
              <h2>Check your order detail and the price can be different according to actual weight of product.</h2>
              </div>
              {searchResults}
            </div>
        );
    }
}

//   const mapStateToProps = state => {
//     //console.log(state.allGames.isFetching)
//     return {

//     };
//   };

//   const mapDispatchToProps = dispatch => {
//     return {
//       actions: bindActionCreators(actions, dispatch)
//     };
//   };

export default OrderPayment;
