import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Divider, message } from 'antd';
import { v4 as uuid } from 'uuid';

import { AxiosService } from '../../services/axios';
import RequestService from '../../services/request';

import { appendHistory } from '../../constants/action-types';

import Response from '../Response/';

import RequestUrl from './Url';
import RequestActions from './Actions/';
import RequestTabs from './Tabs/';

const { Title } = Typography;

class Request extends Component {
	constructor(props) {
		super(props);

		this.state = {
			axios: new AxiosService(),
			isLoading: false
		};
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

	handleKeyDown = (e) => {
		const { id, updateRequest, active } = this.props;
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
				updateRequest(id, RequestService.createRequest());
			}
		}
	};

	updateMetadata = (key, value, markUnsaved = true) => {
		const { id, request, updateRequest } = this.props;
		const { metadata } = request;
		updateRequest(id, {
			...request,
			metadata: { ...metadata, [key]: value, unsavedChanges: markUnsaved }
		});
	};

	updateRequestContext = (key, value, markUnsaved = true) => {
		const { id, request, updateRequest } = this.props;
		const { context, metadata } = request;
		updateRequest(id, {
			...request,
			metadata: { ...metadata, unsavedChanges: markUnsaved },
			context: { ...context, [key]: value }
		});
	};

	updateResponse = (response) => {
		const { id, request, updateRequest } = this.props;
		updateRequest(id, { ...request, response });
	};

	sendRequest = () => {
		const { axios, isLoading } = this.state;
		const { dispatch, id, request, updateRequest } = this.props;
		const { metadata, context } = request;
		const { isValid, msg } = RequestService.validateContext(context);

		// Validate request
		if (!isValid || isLoading) {
			if (msg.length) {
				message.error(msg);
			}
			return;
		}

		const startTime = Date.now();

		this.setState({ isLoading: true }, () => {
			let newResponse = RequestService.createEmptyResponse({ startTime });

			axios
				.sendRequest(context)
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

					this.setState(
						{
							isLoading: false
						},
						() => {
							const requestFinished = {
								...request,
								metadata: {
									...metadata,
									completed: true
								},
								response: newResponse
							};
							updateRequest(id, requestFinished);
							dispatch(appendHistory(request));
						}
					);
				});
		});
	};

	cloneRequest = () => {
		this.props.addRequest({
			...this.props.request,
			metadata: { ...this.props.request.metadata, uuid: uuid() }
		});
	};

	importRequest = (request) => {
		const { id, updateRequest } = this.props;
		updateRequest(id, request);
	};

	render() {
		const { isLoading } = this.state;
		const { request } = this.props;
		const { metadata, context, response } = request;

		return (
			<div className="Request">
				<RequestUrl
					context={context}
					updateRequestContext={this.updateRequestContext}
					sendRequest={this.sendRequest}
					isLoading={isLoading}
				/>

				<RequestActions
					request={request}
					importRequest={this.importRequest}
					cloneRequest={this.cloneRequest}
					updateMetadata={this.updateMetadata}
				/>

				<Divider />

				<Title level={4}>Request options</Title>
				<RequestTabs context={context} updateRequestContext={this.updateRequestContext} />

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

export default connect()(Request);
