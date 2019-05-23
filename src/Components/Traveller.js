import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
//import { Link } from 'react-router-dom';
import $ from 'jquery';
import * as actions from "../Actions/Index";
import { Collapse } from 'reactstrap'
import { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TravelsService from '../TravelsService'
import '../Styles/Traveller.css'

const  travelsService  =  new TravelsService();

class Traveller extends Component {
    static propTypes = {
        //   isFetching: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            from: undefined,
            to: undefined,
            fromLoc: '',
            toLoc: '',
            availableSpace: '',
            estimatedPrice: '',
            flightNumber:'',
            history:[],
            isChecked:false,
            isFlushed: false
        };
        travelsService.getUsers().then((result)=> {
          this.setState({history:result.data})
        }).catch((error)=>{
                alert('There was an error! Please re-check your form.');
        });
    }

    componentWillReceiveProps(nextProps) {
      // check current props and nextPros of dealLoaded flag. If dealLoaded was false, and is true, which means the data is fetched, then we should reset isFlushed
      if (!this.props.dealLoaded && nextProps.dealLoaded) {
        this.setState({
          isFlushed: false
        });
      }
      // since we assigned the location.state in <Link>, if we see this prop, and the data is not flushed yet, then flush data, in this case we call loadDeals(), which is a redux action
      if (!this.state.isFlushed && nextProps.location.state === 'flushDeal') {
        this.setState({
          isFlushed: true,
        }, () => this.props.loadDeals());
      }
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
    handleDelete = (id) => {
      console.log(id);
      travelsService.deleteUser({'pk': id}).then((result)=>{
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
    acceptRequest = (id) => {
      console.log(id)
      travelsService.updateUser({id:id,
        status:2,
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

    declineRequest = (id) => {
      console.log(id)
      travelsService.updateUser({id:id,
        status:0
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
    handleCreate = () => {
      var tmpData = {
        "startTime": this.state.from.toISOString().slice(0,10),
        "endTime": this.state.to.toISOString().slice(0,10),
        "user": parseInt(localStorage.getItem('id')),
        "availableSpace":  this.refs.availableSpace.value,
        "estimatedPrice":  this.refs.estimatedPrice.value,
        "status":  0,
        "arrival":  this.refs.arrival.value,
        "departure":  this.refs.departure.value,
        "flightno":  this.refs.flightno.value,
        "requestedPrice": 0,
        "requestedUser": "None"
      };
      console.log(tmpData)
      travelsService.createUser(
        tmpData).then((result)=>{
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

    handleToChange = (to) => {
        console.log(to)
        this.setState({ to }, this.showFromMonth);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      if (this.state.isChecked === false) {
        document.querySelector('.errorMessage').innerHTML = 'Please agree with FLY2U\'s general terms before submitting.'
        e.preventDefault();
      }
      this.handleCreate();


      return;
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleRadioChange=()=>{
        this.setState({
            isChecked:!this.state.isChecked
        })

    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };


        let historyPost = this.state.history.map((quote) => {
          // console.log(quote.user, parseInt(localStorage.getItem('id')))
          if(quote.user === parseInt(localStorage.getItem('id'))) {
            // state {0: just upload, 1: contacting, 2: paid, 3: delivering, 4: confirmed}
            return (
              <div className="w80">
              <div className="query">
                <div><strong>Departure</strong></div>
                <div className="query_in">
                  <div>{quote.startTime}</div>
                  <div>{quote.departure}</div>
                </div>
                <div><strong>Arrival</strong></div>
                <div className="query_in">
                  <div>{quote.endTime}</div>
                  <div>{quote.arrival}</div>
                </div>
                <div><strong>Flight</strong></div>
                <div className="query_inn">{quote.flightno}</div>
                <div><strong>Status</strong></div>
                <div className="query_inn">
                {quote.status == "0" ? "Posted" : ""}
                {quote.status == "1" ? "Bargaining" : ""}
                {quote.status == "2" ? "Delivering" : ""}
                {quote.status == "3" ? "Delivered" : ""}
                </div>
                <div><a id={quote.id} herf="#" onClick={() => this.handleDelete(quote.id)} className="btn btn-primary btn-sm">Delete</a></div>
                <div className="hidden">{quote.id}</div>
              </div>
              <div className="mb1">
              {quote.status == "0" ? <span>We are waiting for new request from user!</span> : ""}
              {quote.status == "1" ? <span>We got a request from user {quote.requestedUser} with {quote.requestedPrice} SEK. <a onClick={() => this.acceptRequest(quote.id)} href="#">Accept</a> <a onClick={() => this.declineRequest(quote.id)} href="#">Decline</a> </span> : ""}
              {quote.status == "2" ? <span>You have to send the product and consistenly chat with the user {quote.requestedUser}! </span>: ""}

              </div>
              </div>
            )
          }
        });

        return (
            <div>
                {/* create a service post here */}
                <div className='showing'>
                  Traveler Page
                </div>
                <div className='mt5 mb4 white-box'>
                    <a className='f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black mt2' onClick={this.toggle}>Create a Post Here</a>


                    <Collapse isOpen={this.state.isOpen} navbar>
                      <form onSubmit={this.handleSubmit} className="">
                        <div className="TimeInputFromTo mt3">
                            <em>Flight time </em>
                            <DayPickerInput
                                value={from}
                                placeholder="From"
                                format="LL"
                                dayPickerProps={{
                                    selectedDays: [from, { from, to }],
                                    disabledDays: { after: to },
                                    toMonth: to,
                                    modifiers,
                                    numberOfMonths: 1,
                                    onDayClick: () => this.to.getInput().focus(),
                                }}
                                onDayChange={this.handleFromChange}
                                inputProps={
                                   { required: true }
                                 }
                            />{' '}
                            —{' '}
                            <span className="InputFromTo-to">
                                <DayPickerInput
                                    ref={el => (this.to = el)}
                                    value={to}
                                    placeholder="To"
                                    format="LL"
                                    dayPickerProps={{
                                        selectedDays: [from, { from, to }],
                                        disabledDays: { before: from },
                                        modifiers,
                                        month: from,
                                        fromMonth: from,
                                        numberOfMonths: 1,
                                    }}
                                    onDayChange={this.handleToChange}
                                    inputProps={
                                       { required: true}
                                     }
                                />
                            </span>
                        </div>
                        <div className='mt3 flee'>
                            <em>Departure Airport</em>
                            <input placeholder="Departure" autocomplete="off" ref="departure" id="fromLoc" required></input>
                            {' '} to Arrival Airport{' '}
                            <input placeholder="Destination" autocomplete="off" ref="arrival" id='toLoc' required></input>
                        </div>
                        <div className='mt3'>
                            <em>Flight Number </em>
                            <input id="flightNumber" ref="flightno" onChange={this.handleInputChange} required></input>
                        </div>
                        <div className='mt3'>
                            <em>Available Space </em>
                            <input id="availableSpace" ref="availableSpace" onChange={this.handleInputChange} required></input>
                            <em> {'  Kg'}</em>
                        </div>
                        <div className='mt3'>
                            <em>Estimated Price </em>
                            <input id="estimatedPrice" ref="estimatedPrice" onChange={this.handleInputChange} required></input>
                            <em> {'  Kr/Kg'}</em>
                        </div>
                        <input type='radio' checked={this.state.isChecked} onClick={this.handleRadioChange} className='mt3'></input>
                        <em> I agree with the general terms provided by FLY2U</em>
                        <div>
                        <p className="mt3 errorMessage"></p>
                        <button className="mt3 btn btn-primary f6 no-underline grow dib v-mid ba b--black ph3 pv2 mb3">Submit</button>

                        </div>
                        </form>
                    </Collapse>


                </div>
                {/* history post */}
                <hr/>
                <div className=''>
                    <h2>History Posts</h2>

                    <div className='white-box vertflee mb4 mt4'>
                    {historyPost}
                    <div className='mt4'>
                    <span><strong>Notice: There are four types of status</strong></span><br/>
                    <span> Posted: Your post can be seen in public - Buyer part</span><br/>
                    <span> Bargaining: You get the new suggestion from user and you can accept or deny</span><br/>
                    <span> Delivering: You accepted the offer and you should deliver the item according to your itinerary</span><br/>
                    <span> Delivered: Your customer received the item and confirmed the delivery. You will receive your earning!</span>
                    </div>
                    </div>
                </div>
                <script>
                AirportInput("fromLoc");
                AirportInput("toLoc");
                </script>
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

export default Traveller;
