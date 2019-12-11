'use strict';

import React, { Component } from 'react';

class Colors extends Component {
	constructor(props) {
		super(props);

		this.state = {
			colors: []
		};

		this.createColor = this.createColor.bind(this);
		this.deleteColor = this.deleteColor.bind(this);
		this.updateColors = this.updateColors.bind(this);
		this.randomizeColor = this.randomizeColor.bind(this);
		this.changeColor = this.changeColor.bind(this);
	}

	componentDidMount() {
		fetch('/api/color').then((res) => res.json()).then((json) => {
			this.setState({
				colors: json
			});
		});
	}

	randomizeColor() {
		return {
			r: Math.round(Math.random() * 255),
			g: Math.round(Math.random() * 255),
			b: Math.round(Math.random() * 255),
			a: Math.random().toFixed(1)
		};
	}

	createColor() {
		fetch('/api/color', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.randomizeColor())
		})
			.then((res) => res.json())
			.then((json) => {
				let colors = this.state.colors;

				colors.push(json);

				this.setState({
					colors: colors
				});
			});
	}

	changeColor(index) {
		const { colors } = this.state;
		const id = colors[index]._id;
		const newColor = this.randomizeColor();

		fetch(`/api/color/${id}/edit`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newColor)
		}).then((_) => {
			this.updateColors(index, newColor);
		});
	}

	deleteColor(index) {
		const { colors } = this.state;
		const id = colors[index]._id;

		fetch(`/api/color/${id}`, { method: 'DELETE' }).then((_) => {
			this.updateColors(index, null);
		});
	}

	updateColors(index, data) {
		let prevData = this.state.colors;

		if (data) {
			prevData[index] = data;
		}
		else {
			prevData.splice(index, 1);
		}

		this.setState({
			colors: prevData
		});
	}

	render() {
		const { colors } = this.state;

		return (
			<div id="Colors">
				<h2>Colors</h2>

				<ul id="color-box">
					<li className="color-item color-creator" onClick={this.createColor}>
						+
					</li>
					{colors
						.map((color, i) => {
							return (
								<li
									key={i}
									className="color-item"
									style={{
										background:
											'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',' + color.a + ')'
									}}
								>
									<span className="color-item-randomize" onClick={() => this.changeColor(i)}>
										↺
									</span>
									<span className="color-item-delete" onClick={() => this.deleteColor(i)}>
										✕
									</span>
								</li>
							);
						})
						.reverse()}
				</ul>
			</div>
		);
	}
}

export default Colors;
