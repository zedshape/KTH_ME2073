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
                    Your orders
                    </Link>
                  </div>
                  <div>
                    Login & security
                  </div>
                  <div>
                    Your address
                  </div>
                  <div>
                    Payment options
                  </div>
                </div>
                <hr />

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
