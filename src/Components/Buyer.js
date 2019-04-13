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
            searchInput: ''
        };
    }

    componentDidMount() {

    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            console.log('value', this.state.searchInput);
        }
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
                <div className='mt4'>
                    <input className='w-60-l w-60-m w-80' placeholder=' Search Here...' id='searchInput' onKeyDown={this.keyPress} onChange={this.handleInputChange}></input>
                    <div className='mt3'>
                        <a className='f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black mt2' onClick={this.toggle}>Advanced Search</a>
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <div className="TimeInputFromTo mt2">
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
                        </Collapse>
                </div>
                
            </div>
            <div className='mt4'>
                <em>Search Results</em>

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
