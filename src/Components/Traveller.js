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
            flightNumber:''
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

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };

        return (
            <div className='avenir'>
                {/* create a service post here */}
                <div className='mt5 mb4'>
                    <a className='f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black mt2' onClick={this.toggle}>Create a Post Here</a>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <div className="TimeInputFromTo mt3">
                            <em>Select time </em>
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
                            <em>Destination </em>
                            <input placeholder="From" id="fromLoc" onChange={this.handleInputChange}></input>{' '}—{' '}
                            <input placeholder="To" id='toLoc' onChange={this.handleInputChange}></input>
                        </div>
                        <div className='mt3'>
                            <em>Flight Number </em>
                            <input id="flightNumber" onChange={this.handleInputChange}></input>
                        </div>
                        <div className='mt3'>
                            <em>Available Space </em>
                            <input id="availableSpace" onChange={this.handleInputChange}></input>
                            <em> {'  Kg'}</em>
                        </div>
                        <div className='mt3'>
                            <em>Estimated Price </em>
                            <input id="estimatedPrice" onChange={this.handleInputChange}></input>
                            <em> {'  Kr/Kg'}</em>
                        </div>
                        <div>
                        <a class="f6 grow no-underline ba ph3 pv2 mb2 dib black mt3">Submit</a>
                        </div>
                    </Collapse>

                </div>
                {/* history post */}
                <em>-------------------------------</em>
                <div className=''>
                    <em>History Post</em>
                    
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

export default Traveller;
