import React from 'react';

import { Tabs } from 'antd';

import Request from './Request/';
import RequestCreate from './Request/Create';

const { TabPane } = Tabs;

class Requests extends React.Component {
	constructor(props) {
		super(props);

		const requests = [
			{
				metadata: { title: 'Test 1' },
				request: {
					url: 'https://jsonplaceholder.typicode.com/users',
					method: 'get',
					headers: {
						'Content-Type': {
							value: 'application/json'
						}
					}
				}
			}
		];

		const panes = [];
		for (let i = 0; i < requests.length; i++) {
			const request = requests[i];

			panes.push({
				key: i.toString(),
				title: request.metadata.title,
				request: requests[i]
			});
		}

		// New request
		panes.push({
			title: 'Untitled request',
			key: panes.length.toString(),
			request: {}
		});

		this.state = {
			// activeKey: panes[panes.length - 1].key.toString(),
			activeKey: '0',
			panes,
			requests
		};
	}

	componentDidMount = () => {
		window.addEventListener('keydown', this.handleKeyDown);
	};

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		const { keyCode, altKey } = e;
		const { panes, activeKey } = this.state;

		if (altKey) {
			// Alt + 1-9 => Switch to tab
			if (keyCode >= 49 && keyCode <= 57 && keyCode - 49 < panes.length) {
				this.setState({
					activeKey: (keyCode - 49).toString()
				});

				// Alt + T => Add new tab
			} else if (keyCode === 84) {
				this.add();

				// Alt + W => Close current tab
			} else if (keyCode === 87 && panes.length) {
				this.remove(activeKey);
			}
		}
	};

	onChange = (activeKey) => {
		this.setState({ activeKey });
	};

	onEdit = (targetKey, action) => {
		this[action](targetKey);
	};

	add = (request = {}) => {
		const { panes } = this.state;
		const activeKey = `tab-${panes.length + 1}`;

		panes.push({
			title: request.metadata ? request.metadata.title : 'Untitled request',
			key: activeKey,
			request
		});
		this.setState({ panes, activeKey });
	};

	remove = (targetKey) => {
		let { activeKey } = this.state;
		let lastIndex;

		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});

		const panes = this.state.panes.filter((pane) => pane.key !== targetKey);

		if (panes.length && activeKey === targetKey) {
			if (lastIndex >= 0) {
				activeKey = panes[lastIndex].key;
			} else {
				activeKey = panes[0].key;
			}
		}

		this.setState({ panes, activeKey });
	};

	render() {
		const { activeKey, panes } = this.state;

		return (
			<div className="Requests">
				{panes.length ? (
					<Tabs
						onChange={this.onChange}
						activeKey={activeKey}
						type="editable-card"
						onEdit={this.onEdit}
					>
						{panes.map((pane) => (
							<TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
								<Request
									request={pane.request}
									addRequest={this.add}
									active={pane.key === activeKey}
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

Requests.defaultProps = {
	requests: []
};

export default Requests;
