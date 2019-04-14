import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { Link } from 'react-router-dom';

import * as actions from "../../Actions/Index";
import { Container, Row, Col } from 'reactstrap';
import {
	MessageBox,
	ChatItem,
	ChatList,
	SystemMessage,
	MessageList,
	Input,
	Button,
	Avatar,
	Navbar,
	SideBar,
	Dropdown,
	Popup,
} from 'react-chat-elements';


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
			input:''
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
	
	addMessage() {
		var list = this.state.messageList;
		let input ={
			position:  'right',
			type : 'text',
			status : 'read',
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
				<Row>
					<Col xs="6" sm="4" >
						<ChatList
							className='chat-list'
							dataSource={[
								{
									avatar: 'https://facebook.github.io/react/img/logo.svg',
									title: 'UserName',
									subtitle: 'What are you doing?',
									date: new Date(),
									unread: 0,
								}]}
							onClick={this.handleChatListClick}
						/>
					</Col>
					<Col className='bl b--black-10'>
					<MessageList
						className='message-list mt3'
                        lockable={true}
                        downButtonBadge={10}
                        dataSource={this.state.messageList} />
					<Input
						className='mt3 flex items-end'
                        placeholder="test"
                        defaultValue=""
                        ref='input'
                        multiline={true}
						// buttonsFloat='left'
						onChange={this.handleInputChange}
                        onKeyPress={(e) => {
                            if (e.shiftKey && e.charCode === 13) {
                                return true;
                            }
                            if (e.charCode === 13) {
                                this.refs.input.clear();
                                this.addMessage();
                                e.preventDefault();
                                return false;
                            }
                        }}
                        rightButtons={
                            <Button
                                text='Send'
                                onClick={this.addMessage.bind(this)} />
                        } />
					</Col >
				</Row>
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