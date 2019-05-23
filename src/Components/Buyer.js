import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";
import { Collapse } from 'reactstrap'
import { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import UsersService from '../UsersService'
import TravelsService from '../TravelsService'
const  travelsService  =  new TravelsService();
const  usersService  =  new UsersService();

class Buyer extends Component {
    static propTypes = {
        //   isFetching: PropTypes.string.isRequired,
        //   games: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            from: undefined,
            to: undefined,
            fromLoc: '',
            toLoc: '',
            history:[],
            users: [],
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
        usersService.getUsers(
        ).then((result)=> {
          this.setState({users:result.data})
        });

        travelsService.getUsers().then((result)=> {
          this.setState({history:result.data})
        }).catch((error)=>{
                alert('There was an error! Please re-check your form.');
        });
    }

    componentDidMount() {
      window.AirportInput("fromLoc");
      window.AirportInput("toLoc");
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleSearchClick = () => {

    }

    showFromMonth = () => {
        const { from, to } = this.state;
        if (!from) {
            return;
        }
        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from);
        }
    }
    handleFromChange = (from) => {
        // Change the from date and focus the "to" input field
        console.log(from)
        this.setState({ from });
    }
    handleToChange = (to) => {
        console.log(to)
        this.setState({ to }, this.showFromMonth);
    }


    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };

        let searchResults = this.state.history.map((quote) => {
            var name = "";
            var email = "";
            this.state.users.map((user) => {
              if (user.id == quote.user) {
                name = user.name;
                email = user.email;
              }
            })
            // state {0: just upload, 1: contacting, 2: paid, 3: delivering, 4: confirmed}

            var returnLink = (email) => {
              if(localStorage.getItem("login") !== "true") {
                return (
                  <div className="height_50">
                  <button className='f6 br1 ba ph3 pv2 mb2 dib ' disabled>Login Required</button>&nbsp;&nbsp;
                  </div>
                )
              }
              else if(localStorage.getItem("email") == email) {
                return (<div className="height_50"><span className='red'>Your Post!</span></div>)
              } else if (quote.status != 0){
                return (
                  <div className="height_50">
                  <button className='f6 br1 ba ph3 pv2 mb2 dib ' disabled>Bargaining with user</button>&nbsp;&nbsp;
                  </div>
                )
              } else {
                return (
                  <div className="height_50">
                  <Link to='/Chat'><button className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Contact</button></Link>&nbsp;&nbsp;
                  <Link to={{pathname: '/OrderPayment', id: quote.id}}><button className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Pay</button></Link>
                  </div>
                )
              }
            }
            return (
              <div className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                  <div className="tc">
                      <img src={this.state.avatars[quote.user%16]} className="br-100 h3 w3 dib" title="Service Provider" />
                      <h1 className="f5">{email}</h1>
                      <hr className="mw3 bb bw1 b--black-10" />
                  </div>
                  <h1 className="f2">{quote.departure.slice(0,3)} &rarr; {quote.arrival.slice(0,3)} </h1>
                  <h3 className="f4">{quote.startTime} - {quote.endTime}</h3>
                  <h3 className="f5 grey">Max {quote.availableSpace}kg / {quote.estimatedPrice} SEK/kg</h3>
                  {returnLink(email)}
              </div>

              )
        });

        // let searchResults =
        //     <div className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
        //         <div className="tc">
        //             <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib" title="Service Provider" />
        //             <h1 className="f5">Service Provider</h1>
        //             <hr className="mw3 bb bw1 b--black-10" />
        //         </div>
        //         <h1 className="f4">Destination:</h1>
        //         <h1 className="f4">Flight Time:</h1>
        //         <Link to='/Chat'><button className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Contact</button></Link>
        //         <Link to='/OrderPayment'><button className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Pay</button></Link>
        //     </div>

        return (
            <div>
            <div className='showing'>
              Find out your best fit!
            </div>
                <div className='mt4'>
                    <div className='mt3 white-box'>
                        <div className="TimeInputFromTo mt2">
                            <em>Time &nbsp;&nbsp;&nbsp;</em>
                            <DayPickerInput
                                value={from}
                                placeholder="From"
                                format="LL"
                                formatDate={formatDate}
                                parseDate={parseDate}
                                dayPickerProps={{
                                    selectedDays: [from, { from, to }],
                                    disabledDays: { after: to },
                                    toMonth: to,
                                    modifiers,
                                    numberOfMonths: 1,
                                    onDayClick: () => this.to.getInput().focus(),
                                }}
                                onDayChange={this.handleFromChange}
                            />{' '}
                            —{' '}
                            <span className="InputFromTo-to">
                                <DayPickerInput
                                    ref={el => (this.to = el)}
                                    value={to}
                                    placeholder="To"
                                    format="LL"
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    dayPickerProps={{
                                        selectedDays: [from, { from, to }],
                                        disabledDays: { before: from },
                                        modifiers,
                                        month: from,
                                        fromMonth: from,
                                        numberOfMonths: 1,
                                    }}
                                    onDayChange={this.handleToChange}
                                />
                            </span>
                        </div>
                        <div className='mt3'>
                            <div className='mt3 flee'>
                                <em>Departure Airport</em>
                                <input placeholder="Departure" autoComplete="off" ref="departure" id="fromLoc" onChange={this.handleInputChange} required></input>
                                {' '} to Arrival Airport{' '}
                                <input placeholder="Destination" autoComplete="off" ref="arrival" id='toLoc' onChange={this.handleInputChange} required></input>
                            </div>
                        </div>
                        <button className='f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black mt4 ' id='searchInput' onClick={this.handleSearchClick}>Search</button>

                        <button className='f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black mt4 ' id='showAll' onClick={this.handleSearchClick}>Show All</button>
                    </div>

                </div>
                <hr/>
                <div className='mt4 mb4'>
                    <h2>Search Results</h2>
                    <div className='flee'>
                    <div className="flee_buyer">
                    {searchResults}
                    </div>
                    </div>
                </div>

            </div >
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

export default Buyer;
