import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
//import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";
import { Collapse } from 'reactstrap'
import { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import '../Styles/Traveller.css'



class TravellerPost extends Component {
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
            isChecked:false
        };
    }

    componentDidMount() {

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
    handleToChange = (to) => {
        console.log(to)
        this.setState({ to }, this.showFromMonth);
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
        const { from, to, fromLoc, toLoc, availableSpace, estimatedPrice, flightNumber } = this.state;
        const modifiers = { start: from, end: to };

        return (
            <div className='avenir'>
                {/* create a service post here */}
                <div className='mt5 mb4'>
                        <div className="TimeInputFromTo mt3">
                            <em>Flight time </em>
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
                            <em>Departure City</em>
                            <input value={} id="fromLoc" onChange={this.handleInputChange}></input>
                            {' '} to My Destination City{' '}
                            <input value={} id='toLoc' onChange={this.handleInputChange}></input>
                        </div>
                        <div className='mt3'>
                            <em>Flight Number </em>
                            <input value={flightNumber} id="flightNumber" onChange={this.handleInputChange}></input>
                        </div>
                        <div className='mt3'>
                            <em>Available Space </em>
                            <input value={} id="availableSpace" onChange={this.handleInputChange}></input>
                            <em> {'  Kg'}</em>
                        </div>
                        <div className='mt3'>
                            <em>Estimated Price </em>
                            <input value={} id="estimatedPrice" onChange={this.handleInputChange}></input>
                            <em> {'  Kr/Kg'}</em>
                        </div>
                        <input type='radio' checked={this.state.isChecked} onClick={this.handleRadioChange} className='mt3'></input>
                        <em> I agree with the general terms provided by FLY2U</em>
                        <div>
                        <a class="f6 grow no-underline ba ph3 pv2 mb2 dib black mt3">Submit</a>
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

export default TravellerPost;
