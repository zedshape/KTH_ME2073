import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";



class Main extends Component {
    static propTypes = {
        //   isFetching: PropTypes.string.isRequired,
        //   games: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className='avenir'>
                <div className='mt6 ph4'>
                    <h3>Do you want somebody bring sth for you?</h3>
                    <h4>Press the button below</h4>
                    <Link to='/Buyer'>
                        <button className='mt2 f6 link dim br3 ba bw1 ph3 pv2 mb2 dib b--black'>Buyer's Page</button>
                    </Link>
                </div>
                <h2 className='mt3'>Or</h2>
                <div className='mt4 ph4'>
                    <h3>Are you willing to bring sth while travelling?</h3>
                    <h4>Press the button below</h4>
                    <Link to='/Traveller'>
                        <button className='mt2 f6 link dim br3 ba bw1 ph3 pv2 mb2 dib b--black'>Traveller's Page</button>
                    </Link>
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

export default Main;
