'use strict';

import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';

import { Grid, Segment, Image, Label, Input, Button, Divider } from 'semantic-ui-react';

class ImageUploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null
		};
	}

	onImageChange(e) {
		let imageFormObj = new FormData();

		imageFormObj.append('imageName', 'multer-image-' + Date.now());
		imageFormObj.append('imageData', event.target.files[0]);

		this.setState({
			image: URL.createObjectURL(event.target.files[0])
		});

		axios
			.post(`http://localhost:3000/image/upload`, imageFormObj)
			.then((data) => {
				if (data.data.success) {
					alert('Image has been successfully uploaded using multer');
				}
			})
			.catch((err) => {
				alert('Error while uploading image using multer');
			});

		// if (event.target.files && event.target.files[0]) {
		// 	let img = event.target.files[0];
		// 	this.setState({
		// 		image: URL.createObjectURL(img)
		// 	});
		// 	this.props.onUploadImage(URL.createObjectURL(img));
		// }
		// console.log(event);
	}

	render() {
		const { image } = this.state;

		if (image) {
			return (
				<div>
					<Image rounded fluid src={this.state.image} />
					<input
						type="file"
						name="file"
						id="file"
						className="file-input"
						accept="image/*"
						onChange={(e) => this.onImageChange(e, 'multer')}
					/>

					<Divider hidden />

					<label htmlFor="file">
						<Button fluid type="file" htmlFor="file">
							Upload new Image
						</Button>
					</label>
				</div>
			);
		}
		else {
			return (
				<Segment placeholder>
					<Grid columns={1} stackable textAlign="center">
						<input
							type="file"
							name="file"
							id="file"
							className="file-input"
							accept="image/*"
							onChange={this.onImageChange.bind(this)}
						/>
						<label htmlFor="file">
							<Button primary type="file" htmlFor="file">
								Upload Image
							</Button>
						</label>
					</Grid>
				</Segment>
			);
		}
	}
}

export default ImageUploader;
