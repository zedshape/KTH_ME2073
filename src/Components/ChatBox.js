import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { Link } from 'react-router-dom';

import * as actions from "../Actions/Index";



class ChatBox extends Component {
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

export default ChatBox;