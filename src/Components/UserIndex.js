import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";



class UserIndex extends Component {
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
            <div>
              <div className='showing_sml'>
                Are you ready to fly?
              </div>
                <h1 class="mt3">Hi {localStorage.getItem('name')} ({localStorage.getItem('email')}) :)!</h1>

                <div class="gridUserIndex center mt4 mb4">
                  <div>
                    <Link to='/OrderDetails'>
                    <h2>Your orders</h2>
                    </Link>

                    <h6>Track, History, Current status</h6>
                  </div>
                  <div>
                  <Link to='#'>
                    Login & security
                  </Link>
                  <h6>Account setting, Email, Mobile</h6>
                  </div>
                  <div>
                  <Link to='#'>
                    Your address
                    </Link>
                    <h6>Address for order</h6>
                  </div>
                  <div>
                  <Link to='#'>
                    Payment options
                    </Link>
                    <h6>Edit or add payment methods</h6>
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

export default UserIndex;
