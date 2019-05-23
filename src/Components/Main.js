import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import * as actions from "../Actions/Index";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;


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

    checkifLogin() {

    }
    render() {

        return (
            <div>
                <div className='showing'>
                  Fly high, Get money, Make somebody happy!
                </div>
                <div className='mt5'>
                <h2>Welcome to our <span className="fly2u">FLY2U</span> service!</h2><h5> <span className="fly2u">FLY2U</span> is premium low-cost transportation service using reliable airline. <br/>People who want to share their empty baggage space, or who want to transit/receive what they want from/to abroad can use this platform!</h5>
                </div>
                <div className='mainGrid'>
                  <div className='white-box mt5 ph4'>
                      <img src="https://image.flaticon.com/icons/svg/154/154087.svg" style={{width: '100px'}}/>
                      <h3 className='mt5'>Do you want somebody bring something for you?</h3>

                      <Link to='/Buyer'>
                          <button className='mt3 btn btn-primary btn-lg'>Yes, I want to get something from somewhere else!</button>
                      </Link>
                  </div>
                  <div className='or'></div>
                  <div className='white-box mt5 ph4'>
                      <img src="https://image.flaticon.com/icons/svg/59/59919.svg" style={{width: '100px'}}/>

                      <h3 className='mt5'>Are you willing to bring something while travelling?</h3>
                      <Link to={{pathname:"/SignIn", afterpath: "/Traveller"}}>
                          <button className='mt3 btn btn-primary btn-lg'>Yes, I want to get money using my empty baggage!</button>
                      </Link>
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

export default Main;
