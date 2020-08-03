import React from 'react';

import { Tabs } from 'antd';

import Request from './Request/';
import RequestCreate from './Request/Create';

const { TabPane } = Tabs;

class Requests extends React.Component {
	componentDidMount = () => {
		window.addEventListener('keydown', this.handleKeyDown);
	};

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		const { keyCode, altKey } = e;
		const { requests, activeRequest, addRequest, removeRequest, setActiveRequest } = this.props;

		if (altKey) {
			// Alt + 1-9 => Switch to tab
			if (keyCode >= 49 && keyCode <= 57 && keyCode - 49 < requests.length) {
				setActiveRequest(requests[keyCode - 49].metadata.uuid);

				// Alt + T => Add new tab
			} else if (keyCode === 84) {
				addRequest();

				// Alt + W => Close current tab
			} else if (keyCode === 87 && requests.length) {
				removeRequest(activeRequest);
			}
		}
	};

	onChange = (activeKey) => {
		this.props.setActiveRequest(activeKey);
	};

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	};

	add = () => {
		this.props.addRequest();
	};

	remove = (targetKey) => {
		this.props.removeRequest(targetKey);
	};

	render() {
		const { requests, activeRequest, addRequest, updateRequest } = this.props;

		console.log(requests);

		const unsavedChangesIndicator = (
			<span
				style={{
					height: 7,
					width: 7,
					backgroundColor: '#1890ff',
					display: 'inline-block',
					marginLeft: 5,
					marginBottom: 1,
					borderRadius: 15
				}}
			></span>
		);

		return (
			<div className="Requests">
				{requests.length ? (
					<Tabs
						onChange={this.onChange}
						activeKey={activeRequest}
						type="editable-card"
						onEdit={this.onEdit}
						size="large"
					>
						{requests.map((request, i) => (
							<TabPane
								tab={
									<span>
										{request.metadata.title}
										{request.metadata.unsavedChanges ? unsavedChangesIndicator : null}
									</span>
								}
								key={request.metadata.uuid}
								closable={true}
							>
								<Request
									request={request}
									addRequest={addRequest}
									updateRequest={updateRequest}
									id={request.metadata.uuid}
									active={request.metadata.uuid === activeRequest}
								/>
							</TabPane>
						))}
					</Tabs>
				) : (
					<RequestCreate addRequest={this.add} />
				)}
			</div>
		);
	}
}

export default Requests;
