import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { Link } from 'react-router-dom';

import * as actions from "../../Actions/Index";



class ChatBox extends Component {
    static propTypes = {
        //   isFetching: PropTypes.string.isRequired,
        //   games: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            messageList: [],
            input: '',

        };
    }

    componentDidMount() {

    }

    handleChatListClick = () => {
        this.setState({
            isShow: !this.state.isShow
        });
    }

    handleInputChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    addMessage = () => {
        var list = this.state.messageList;
        let input = {
            position: 'right',
            type: 'text',
            status: 'read',
            view: 'list',
            theme: 'white',
            text: this.state.input,
            date: +new Date()
        }
        list.push(input)
        console.log(list)
        this.setState({
            messageList: list,
        });

    }

    render() {



        return (
            <div>
            <div className='showing'>
              Chat, and get a deal!
            </div>
                <div id="messages-card" class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
                    <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                        <div id="messages">
                            <span id="message-filler"></span>
                        </div>
                        <form id="message-form" action="#">
                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input class="mdl-textfield__input" type="text" id="message" />
                                <label class="mdl-textfield__label" for="message">Message...</label>
                            </div>
                            <button id="submit" disabled type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                                Send
                             </button>
                        </form>
                        <form id="image-form" action="#">
                            <input id="mediaCapture" type="file" accept="image/*" capture="camera" />
                            <button id="submitImage" title="Add an image" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white">
                                <i class="material-icons">image</i>
                            </button>
                        </form>
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

export default ChatBox;
