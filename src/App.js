import React from 'react';
import { Layout } from 'antd';

import 'antd/dist/antd.css';

import './App.scss';

import Requests from './containers/Requests';
import NavigationSidebar from './containers/Sidebar';
import NavigationHeader from 'components/Navigation/Header';

const { Content } = Layout;

const App = () => {
	return (
		<div className="App">
			<Layout style={{ minHeight: '100vh' }}>
				<NavigationSidebar />
				<Layout>
					<Content style={{ background: 'white' }}>
						<NavigationHeader />
						<div className="site-layout-content">
							<Requests />
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default App;
