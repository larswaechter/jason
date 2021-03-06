import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Popconfirm, Form, Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef();
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex]
		});
	};

	const save = async (e) => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`
					}
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

class RequestTabsHeaders extends React.Component {
	constructor(props) {
		super(props);

		this.columns = [
			{
				title: 'Key',
				dataIndex: 'key',
				editable: true
			},
			{
				title: 'Value',
				dataIndex: 'value',
				editable: true,
				render: (text, record) => (
					<div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{text}</div>
				)
			},
			{
				title: 'Description',
				dataIndex: 'description',
				editable: true
			},
			{
				title: 'Operation',
				dataIndex: 'operation',
				render: (text, record) =>
					this.state.dataSource.length >= 1 ? (
						<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
							<a>Delete</a>
						</Popconfirm>
					) : null
			}
		];

		const { context } = this.props;
		const { headers } = context;

		const dataSource = [];
		let idCounter = 0;

		for (let header in headers) {
			dataSource.push({
				id: idCounter++,
				key: header,
				value: headers[header].value,
				description: headers[header].description
			});
		}

		this.state = {
			dataSource,
			count: dataSource.length
		};
	}

	handleDelete = (id) => {
		const { context, updateRequestContext } = this.props;
		const dataSource = [...this.state.dataSource];

		// Clone request headers
		const headersClone = Object.assign({}, context.headers);

		// Search header to delete
		const headerToDelete = dataSource.find((item) => item.id === id);

		// Delete and update request headers
		delete headersClone[headerToDelete.key];
		updateRequestContext('headers', headersClone);

		// Update table data
		this.setState({
			dataSource: dataSource.filter((item) => item.id !== id)
		});
	};

	handleAdd = (header = {}) => {
		const { count, dataSource } = this.state;

		const newData = {
			id: dataSource.length,
			key: header.key || '-',
			value: '-',
			description: '-'
		};

		this.setState({
			dataSource: [...dataSource, newData],
			count: count + 1
		});
	};

	handleSave = (row) => {
		const { context, updateRequestContext } = this.props;

		// Clone request headers
		const headersClone = Object.assign({}, context.headers);

		// Existing row
		const newData = [...this.state.dataSource];
		const index = newData.findIndex((item) => item.id === row.id);
		const item = newData[index];

		// Delete header (in case that key was edited)
		delete headersClone[item.key];

		// Add and update request headers
		const updatedHeaders = {
			...headersClone,
			[row.key]: {
				value: row.value,
				description: row.description
			}
		};

		updateRequestContext('headers', updatedHeaders);

		// Update table data
		newData.splice(index, 1, { ...item, ...row });
		this.setState({
			dataSource: newData
		});
	};

	render() {
		const { dataSource } = this.state;
		const components = {
			body: {
				row: EditableRow,
				cell: EditableCell
			}
		};
		const columns = this.columns.map((col) => {
			if (!col.editable) {
				return col;
			}

			return {
				...col,
				onCell: (record) => ({
					record,
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave: this.handleSave
				})
			};
		});

		const btnMenu = (
			<Menu
				onClick={({ key }) => {
					this.handleAdd({ key });
				}}
			>
				<Menu.Item key="Authorization">Authorization</Menu.Item>
				<Menu.Item key="Content-Type">Content-Type</Menu.Item>
			</Menu>
		);

		return (
			<div className="RequestTabsHeaders">
				<Dropdown.Button overlay={btnMenu} style={{ marginBottom: 16 }} onClick={this.handleAdd}>
					<PlusOutlined />
					Header
				</Dropdown.Button>

				<Table
					components={components}
					rowClassName={() => 'editable-row'}
					bordered
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					locale={{ emptyText: 'No headers' }}
				/>
			</div>
		);
	}
}

export default RequestTabsHeaders;
