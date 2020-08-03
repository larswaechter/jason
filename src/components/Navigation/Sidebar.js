import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Layout, Menu } from 'antd';
import { HeartOutlined, HistoryOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const NavigationSidebar = (props) => {
	const { history, savedRequests, addRequest, handleSidebarToggle } = props;

	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = (isCollapsed) => {
		setCollapsed(isCollapsed);
		handleSidebarToggle(isCollapsed);
	};

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={toggleCollapsed}
			theme="dark"
			style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
		>
			<div
				style={{
					background: 'rgba(255, 255, 255, 0.2)',
					height: '32px',
					margin: '16px'
				}}
			/>

			<Menu mode="inline" theme="dark" selectable={false}>
				<SubMenu
					key="sub1"
					title={
						<span>
							<HeartOutlined />
							<span>Saved</span>
						</span>
					}
				>
					{savedRequests.map((request, i) => (
						<Menu.Item
							key={i}
							onClick={() => {
								addRequest(savedRequests[i]);
							}}
						>
							{request.metadata.title}
						</Menu.Item>
					))}
				</SubMenu>
				<SubMenu
					key="sub2"
					title={
						<span>
							<HistoryOutlined />
							<span>History</span>
						</span>
					}
				>
					{history.map((request, i) => (
						<Menu.Item
							key={i + savedRequests.length}
							onClick={() => {
								addRequest({
									...history[i],
									// Hide response tab content due to performance issues
									response: { ...history[i].response, autoShow: false }
								});
							}}
						>
							{`${request.context.method.toUpperCase()} - ${moment(
								request.response.startTime
							).format('h:mm:ss a')}`}
						</Menu.Item>
					))}
				</SubMenu>
				<SubMenu
					key="sub3"
					title={
						<span>
							<InfoCircleOutlined />
							<span>About</span>
						</span>
					}
				>
					<Menu.Item key="10">Website</Menu.Item>
					<Menu.Item key="11">GitHub</Menu.Item>
					<Menu.Item key="12">Twitter</Menu.Item>
				</SubMenu>
			</Menu>
		</Sider>
	);
};

export default NavigationSidebar;
