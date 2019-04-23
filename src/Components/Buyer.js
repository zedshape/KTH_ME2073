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

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };

        let searchResults =
            <div class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <div class="tc">
                    <img src="http://tachyons.io/img/avatar_1.jpg" class="br-100 h3 w3 dib" title="Service Provider" />
                    <h1 class="f5">Service Provider</h1>
                    <hr class="mw3 bb bw1 b--black-10" />
                </div>
                <h1 class="f4">Destination:</h1>
                <h1 class="f4">Flight Time:</h1>
                <Link to='/Chat'><button className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Contact</button></Link>
                <Link to='/OrderPayment'><button className='f6 link dim br1 ba ph3 pv2 mb2 dib black'>Pay</button></Link>
            </div>

        return (
            <div className='avenir'>
                <div className='mt4'>
                    <div className='mt3'>
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
                        <button className='f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black mt2 ' id='searchInput' onClick={this.handleSearchClick}>Search</button>
                    </div>

                </div>
                <div className='mt4'>
                    <em>Search Results</em>
                    {searchResults}
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
