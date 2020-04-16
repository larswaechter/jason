import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
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

class RequestTabsParameters extends React.Component {
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
				editable: true
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
		const { params } = context;

		const dataSource = [];
		let idCounter = 0;

		for (let param in params) {
			dataSource.push({
				id: idCounter++,
				key: param,
				value: params[param].value,
				description: params[param].description
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

		// Clone request params
		const paramsClone = Object.assign({}, context.params);

		// Search param to delete
		const paramToDelete = dataSource.find((item) => item.id === id);

		// Delete and update request params
		delete paramsClone[paramToDelete.key];
		updateRequestContext('params', paramsClone);

		// Update table data
		this.setState({
			dataSource: dataSource.filter((item) => item.id !== id)
		});
	};

	handleAdd = () => {
		const { count, dataSource } = this.state;

		const newData = {
			id: dataSource.length,
			key: '-',
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

		// Clone request params
		const paramsClone = Object.assign({}, context.params);

		// Existing row
		const newData = [...this.state.dataSource];
		const index = newData.findIndex((item) => item.id === row.id);
		const item = newData[index];

		// Delete param (in case that key was edited)
		delete paramsClone[item.key];

		// Add and update request parameters
		const updatedParams = {
			...paramsClone,
			[row.key]: {
				value: row.value,
				description: row.description
			}
		};

		updateRequestContext('params', updatedParams);

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
		return (
			<div className="RequestTabsParameters">
				<Button
					onClick={this.handleAdd}
					type="primary"
					style={{
						marginBottom: 16
					}}
				>
					<PlusOutlined />
				</Button>
				<Table
					components={components}
					rowClassName={() => 'editable-row'}
					bordered
					dataSource={dataSource}
					columns={columns}
					pagination={false}
					locale={{ emptyText: 'No parameters' }}
				/>
			</div>
		);
	}
}

export default RequestTabsParameters;
