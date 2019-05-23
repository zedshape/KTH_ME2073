import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { Link } from 'react-router-dom';

import * as actions from "../../Actions/Index";

import '../../Styles/chatbox.css'

import { Row, Col } from 'reactstrap';
import {
	ChatList,
	MessageList,
	Input,
	Button,

} from 'react-chat-elements';


var hi = {
	text: 'Hello',
	status: 'read'
}
var dialogueLeft = {
	position: 'left',
	type: 'photo',
	data: {
		uri: require('../../Styles/Rice.jpg'),
	},
	status: 'read',
	view: 'list',
	theme: 'white',
	date: +new Date()
};

var messageLeft = {
	position: 'left',
	status: 'read',
	text: 'I want some rice from China',
}

var right1 = {
	position: 'right',
	status: 'sent',
	text: 'Okay, Can you tell me where exactly can I get that?'
}

class ChatBox extends Component {
	static propTypes = {
		//   isFetching: PropTypes.string.isRequired,
		//   games: PropTypes.array.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			messageList: [hi, dialogueLeft, messageLeft, right1],
			input: '',
			file: '',
			imagePreviewUrl: '',
			class: "chatbox"
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
		console.log(this.state.input)
	}

	handleImageChange = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		}

		reader.readAsDataURL(file)
		console.log(this.state.file)
	}

	handleClearFileInfo=()=>{
		this.setState({
			file:'',
			imagePreviewUrl:''
		})
	}

	addMessage = (e) => {
		e.preventDefault();
		var list = this.state.messageList;
		if (this.state.file) {
			let imgInput = {
				position: 'right',
				type: 'photo',
				data: {
					uri: this.state.imagePreviewUrl,
				},
				status: 'sent',
				view: 'list',
				theme: 'white',
				date: +new Date()
			}
			list.push(imgInput)
		}

		let input = {
			position: 'right',
			type: 'text',
			status: 'sent',
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

		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = (<img src={imagePreviewUrl} />);
		} else {
			$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
		}



		return (
			<div>
			<div className='showing'>
				Chat, and get a deal!
			</div>
				<Row className="marginZero">
					<Col xs="6" sm="4" className="chat-panel">
						<ChatList
							className='chat-list'
							dataSource={[
								{
									avatar: 'http://tachyons.io/img/avatar-jasonli.jpg',
									title: 'User: ChinaRiceisTheBest',
									subtitle: 'I want some rice from China',
									date: new Date(),
									unread: 0,
								}]}
							onClick={this.handleChatListClick}
						/>
						<ChatList
							className='chat-list'
							dataSource={[
								{
									avatar: 'http://tachyons.io/img/avatar-yavor.jpg',
									title: 'User: BetMyHeadOff ',
									subtitle: 'Sorry, I could not get this one yet',
									date: new Date(),
									unread: 0,
								}]}
							onClick={this.handleChatListClick}
						/>
						<ChatList
							className='chat-list'
							dataSource={[
								{

									title: 'FLY2U Helper',
									subtitle: 'Your delivery is just confirmed by buyer! Your money will be paid in a week.',
									date: new Date(),
									unread: 1,
								}]}
							onClick={this.handleChatListClick}
						/>
					</Col>
					<Col className='bl b--black-10 messagePanel'>
						<MessageList
							className='message-list mt3'
							lockable={true}
							downButtonBadge={10}
							dataSource={this.state.messageList} />

						<form onSubmit={(e)=>this.addMessage(e)}>
							<Input
								className='mt3'
								placeholder="Type Message"
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
										this.addMessage(e);
										e.preventDefault();
										return false;
									}
								}}
								rightButtons={
									<button
										className= "chatButton"
										type="submit"
										>Send</button>
								} />
							<input type="file" name="fileToUpload" id="fileToUpload" onChange={(e) => this.handleImageChange(e)}></input>
							<button className="chatButton clearButton" onClick={this.handleClearFileInfo}>Clear Image</button>
						</form>

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
