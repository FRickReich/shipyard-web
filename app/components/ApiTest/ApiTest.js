'use strict';

import React, { Component } from 'react';

class ApiTest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			testInput: ''
		};

		this.newDataEntry = this.newDataEntry.bind(this);
		this.deleteDataEntry = this.deleteDataEntry.bind(this);
		this.updateData = this.updateDataEntry.bind(this);
		this.updateTestInputValue = this.updateTestInputValue.bind(this);
	}

	componentDidMount() {
		fetch('/api/data').then((res) => res.json()).then((json) => {
			this.setState({
				data: json
			});
		});
	}

	updateTestInputValue(event) {
		this.setState({
			testInput: event.target.value
		});
	}

	newDataEntry() {
		const dataEntry = { data: this.state.testInput };

		fetch('/api/data', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataEntry)
		})
			.then((res) => res.json())
			.then((json) => {
				let data = this.state.data;

				data.push(json);

				this.setState({
					data: data
				});
			});
	}

	deleteDataEntry(index) {
		const { data } = this.state;
		const id = data[index]._id;

		fetch(`/api/data/${id}`, { method: 'DELETE' }).then((_) => {
			this.updateDataEntry(index, null);
		});
	}

	updateDataEntry(index, data) {
		let prevData = this.state.data;

		if (data) {
			prevData[index] = data;
		}
		else {
			prevData.splice(index, 1);
		}

		this.setState({
			data: prevData
		});
	}

	render() {
		const { data, testInput } = this.state;

		return (
			<div>
				<h2>ApiTest</h2>

				<p>This section is for API testing.</p>

				<h3>Create new item</h3>

				<input type="text" name="test-data" value={testInput} onChange={this.updateTestInputValue} />
				<button onClick={this.newDataEntry}>Add Data-Item</button>

				<h3>List of items</h3>

				{data.length > 0 ? (
					<ul>
						{data
							.map((dataItem, i) => {
								return (
									<li key={i}>
										{i} -{} {dataItem.data}{' '}
										<button onClick={() => this.deleteDataEntry(i)}>x</button>
									</li>
								);
							})
							.reverse()}
					</ul>
				) : (
					<p>no items created yet.</p>
				)}
			</div>
		);
	}
}

export default ApiTest;
