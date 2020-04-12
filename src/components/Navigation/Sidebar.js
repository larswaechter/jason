import React, { useState } from 'react';

import { Layout, Menu } from 'antd';
import { HeartOutlined, HistoryOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const NavigationSidebar = () => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = (isCollapsed) => {
		setCollapsed(isCollapsed);
	};

	return (
		<Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} theme="dark">
			<div
				style={{
					background: 'rgba(255, 255, 255, 0.2)',
					height: '32px',
					margin: '16px'
				}}
			/>
			<Menu mode="inline" theme="dark">
				<SubMenu
					key="sub1"
					title={
						<span>
							<HeartOutlined />
							<span>Saved</span>
						</span>
					}
				>
					<Menu.Item key="1">option1</Menu.Item>
					<Menu.Item key="2">option2</Menu.Item>
					<Menu.Item key="3">option3</Menu.Item>
					<Menu.Item key="4">option4</Menu.Item>
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
					<Menu.Item key="5">option5</Menu.Item>
					<Menu.Item key="6">option6</Menu.Item>
					<Menu.Item key="7">option7</Menu.Item>
					<Menu.Item key="8">option8</Menu.Item>
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
