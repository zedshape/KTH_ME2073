import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";
import TravelsService from '../TravelsService'


const  travelsService  =  new TravelsService();

class OrderDetails extends Component {
    static propTypes = {
        //   isFetching: PropTypes.string.isRequired,
        //   games: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
          history:[],
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
        travelsService.getUsers().then((result)=> {
          this.setState({history:result.data})
        }).catch((error)=>{
            alert('There was an error! Please re-check your form.');
        });
    }

    componentDidMount() {

    }

    confirmRequest = (id) => {
      console.log(id)
      travelsService.updateUser({id:id,
        status:3,
      })
      .then((result)=> {
        console.log("done");
        travelsService.getUsers().then((result)=> {
          this.setState({history:result.data})
        }).catch((error)=>{
          alert('There was an error! Please re-check your form.');
        });
      }).catch((error)=>{
        alert('There was an error! Please re-check your form.');
      });
    }

    render() {

        let historyPost = this.state.history.map((quote) => {

          // console.log(quote.user, parseInt(localStorage.getItem('id')))
          if(quote.requestedUser === localStorage.getItem('email') && quote.status === 2) {
            // state {0: just upload, 1: contacting, 2: paid, 3: delivering, 4: confirmed}
            // console.log(quote.requestedUser)
            return (
              <div className='mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10"'>
                  <h5>Order Number:{quote.id}</h5>
                  <div class="tc">
                      <img src={this.status.avatars[quote.user%16]} class="br-100 h3 w3 dib" title="Service Provider" />
                      <h1 className="f5">Service Provider</h1>
                      <hr className="mw3 bb bw1 b--black-10" />
                      <img src={this.status.avatars[localStorage.getItem('id')%16]} class="br-100 h3 w3 dib" title="Service Provider" />
                      <h1 className="f5">{quote.requestedUser}</h1>
                      <hr className="mw3 bb bw1 b--black-10" />
                  </div>

                  <h1 className="f4">Price:{quote.requestedPrice}</h1>
                  <h1 className="f4">Destination:{quote.departure}</h1>
                  <h1 className="f4">Flight Time:{quote.startTime} - {quote.endTime}</h1>

                  {quote.status === 2?<button onClick={() => this.confirmRequest(quote.id)} className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Confirm Receive</button>:<button className='f6 br1 ba ph3 pv2 mb2 dib' disabled>Confirmed</button>}

              </div>
            )
          }
        });

        return (
          <div>
            <div className='showing '>
              Check the progress
            </div>
            <h2 className='mt4'>You are now waiting for following delivery!</h2>
            <div className='flee'>
            <div className='flee_buyer'>

            {historyPost}
            </div>
            </div>
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

export default OrderDetails;
