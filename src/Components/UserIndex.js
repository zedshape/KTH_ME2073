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
                <div>
                    <em>History Order</em>
                    <Link to='/OrderDetails' className='no-underline avenir tc'>
                        <div class="mw5 center bg-white no-underline br3 pa3 pa4-ns mv3 ba b--black-10">
                            <div class="tc">
                                <img src="http://tachyons.io/img/avatar_1.jpg" class="br-100 h3 w3 dib" title="Service Provider" />
                                <h1 class="f5">Service Provider</h1>
                                <hr class="mw3 bb bw1 b--black-10" />
                            </div>
                            <h1 class="f4">Destination:</h1>
                            <h1 class="f4">Flight Time:</h1>
                        </div>
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

export default UserIndex;
