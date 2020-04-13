import React, { Component } from 'react';
import { Typography, Divider, message } from 'antd';

import { AxiosService } from '../../services/axios';
import { Helper } from '../../services/helper';

import Response from '../Response/';

import RequestUrl from './Url';
import RequestActions from './Actions';
import RequestTabs from './Tabs/';

const { Title } = Typography;

class Request extends Component {
	constructor(props) {
		super(props);

		const { request } = props;

		this.state = this.createState(request);
	}

	componentDidMount = () => {
		window.addEventListener('keydown', this.handleKeyDown);
	};

	componentWillUnmount = () => {
		window.removeEventListener('keydown', this.handleKeyDown);
	};

	componentDidUpdate = () => {
		if (this.props.active) {
			window.addEventListener('keydown', this.handleKeyDown);
		} else {
			window.removeEventListener('keydown', this.handleKeyDown);
		}
	};

	createState = (request = {}) => {
		return {
			axios: new AxiosService(),
			metadata: Helper.createEmptyMetadata(request.metadata),
			request: Helper.createEmptyRequest(request.request),
			response: Helper.createEmptyResponse(request.response),
			isLoading: false
		};
	};

	handleKeyDown = (e) => {
		const { active } = this.props;
		const { keyCode, altKey } = e;

		if (active && altKey) {
			// Enter => Send
			if (keyCode === 13) {
				this.sendRequest();

				// C => Clone
			} else if (keyCode === 67) {
				this.cloneRequest();

				// R => Reset
			} else if (keyCode === 82) {
				this.setState(this.createState());
			}
		}
	};

	updateRequestKey = (key, value) => {
		this.setState({
			request: {
				...this.state.request,
				[key]: value
			}
		});
	};

	updateResponse = (response) => {
		this.setState({ response });
	};

	sendRequest = () => {
		const { axios, request, metadata, isLoading } = this.state;
		const { isValid, msg } = Helper.validateRequest(request);

		// Validate request
		if (!isValid || isLoading) {
			if (msg.length) {
				message.error(msg);
			}
			return;
		}

		const startTime = Date.now();

		this.setState({ isLoading: true }, () => {
			let newResponse = Helper.createEmptyResponse({ startTime });

			axios
				.sendRequest(request)
				.then((res) => {
					newResponse = {
						...newResponse,
						result: res
					};
				})
				.catch((err) => {
					newResponse = {
						...newResponse,
						error: err
					};
				})
				.finally(() => {
					const endTime = Date.now();
					const duration = endTime - startTime;

					newResponse = {
						...newResponse,
						endTime,
						duration
					};

					if (newResponse.error) {
						message.error('Request failed!');
					} else if (newResponse.result) {
						message.success(`Request finished in ${duration} ms!`);
					}

					this.setState({
						isLoading: false,
						metadata: {
							...metadata,
							completed: true
						},
						response: newResponse
					});
				});
		});
	};

	cloneRequest = () => {
		this.props.addRequest(this.state);
	};

	render() {
		const { metadata, request, response, isLoading } = this.state;

		return (
			<div className="Request">
				<RequestUrl
					request={request}
					updateRequestKey={this.updateRequestKey}
					sendRequest={this.sendRequest}
					isLoading={isLoading}
				/>

				<RequestActions cloneRequest={this.cloneRequest} />

				<Divider />

				<Title level={4}>Request options</Title>
				<RequestTabs request={request} updateRequestKey={this.updateRequestKey} />

				<Divider />

				<Response
					metadata={metadata}
					response={response}
					isLoading={isLoading}
					sendRequest={this.sendRequest}
					updateResponse={this.updateResponse}
				/>
			</div>
		);
	}
}

Request.defaultProps = {
	request: {}
};

export default Request;
