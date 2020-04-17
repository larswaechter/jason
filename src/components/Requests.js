import React from 'react';

import { Tabs } from 'antd';

import Request from './Request/';
import RequestCreate from './Request/Create';

const { TabPane } = Tabs;

class Requests extends React.Component {
	constructor(props) {
		super(props);
	}

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
				setActiveRequest(keyCode - 49);

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

		return (
			<div className="Requests">
				{requests.length ? (
					<Tabs
						onChange={this.onChange}
						activeKey={activeRequest.toString()}
						type="editable-card"
						onEdit={this.onEdit}
					>
						{requests.map((request, i) => (
							<TabPane tab={request.metadata.title} key={i} closable={true}>
								<Request
									request={request}
									addRequest={addRequest}
									updateRequest={updateRequest}
									id={i}
									active={i === activeRequest}
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
