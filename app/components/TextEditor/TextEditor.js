'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';
import { Button, Segment, Menu, Form, TextArea, Radio, Icon, Dropdown, Header } from 'semantic-ui-react';

import ReactMarkdown from 'react-markdown';

class TextEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			showPreview: false,
			user: ''
		};
	}

	saveMessage()
	{
		const { user } = this.props;
		const { value } = this.state;

		if(this.props.user)
		{
			console.log(this.props.user);
			console.log("Saving...");

			fetch(`/api/${ user }/message/new`,
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                text: value
            })
        })
        .then(res => res.json())
        .then(json =>
        {
            console.log(json);
        });
		}
	}

	togglePreview() {
		this.setState((prevState) => ({ showPreview: !prevState.showPreview }));
	}

	setTextStyle(type) {
		const { value, showPreview } = this.state;

		let addToString;

		switch (type) {
			case 'h1':
				addToString = '# ';
				break;
			case 'h2':
				addToString = '## ';
				break;
			case 'h3':
				addToString = '### ';
				break;
			case 'h4':
				addToString = '#### ';
				break;
			case 'h5':
				addToString = '##### ';
				break;
			case 'h6':
				addToString = '###### ';
				break;
			case 'bold':
				addToString = '****';
				break;
			case 'italic':
				addToString = '**';
				break;
			case 'striketrough':
				addToString = '~~~~';
				break;
			case 'link':
				addToString = '[](url)';
				break;
			case 'quote':
				addToString = '> ';
				break;
			case 'code':
				addToString = '``';
				break;
			case 'image':
				addToString = '![](https://example.com/your-image.png)';
				break;
			case 'list-ul':
				addToString = '- ';
				break;
			case 'list-ol':
				addToString = '1. ';
				break;
			case 'tasks':
				addToString = '- [ ] ';
				break;
		}

		this.setState(
			{
				value: `${this.state.value}${addToString}`
			},
			() => {
				this.refs.editorText.focus();
			}
		);
	}

	changeText(event) {
		this.setState({
			value: event.target.value
		});
	}

	render() {
		const { value, showPreview } = this.state;

		console.log(this.state.user);

		return (
			<Segment>
				<Menu attached borderless>
					<Menu.Item>
						<Radio toggle label="Preview" onChange={this.togglePreview.bind(this)} checked={showPreview} />
					</Menu.Item>
					<Menu.Item>
						<Button.Group basic size="small">
							<Dropdown icon="header" floating button className="icon">
								<Dropdown.Menu>
									<Dropdown.Item onClick={this.setTextStyle.bind(this, 'h1')}>
										<Header as="h1">Header H1</Header>
									</Dropdown.Item>
									<Dropdown.Item onClick={this.setTextStyle.bind(this, 'h2')}>
										<Header as="h2">Header H2</Header>
									</Dropdown.Item>
									<Dropdown.Item onClick={this.setTextStyle.bind(this, 'h3')}>
										<Header as="h3">Header H3</Header>
									</Dropdown.Item>
									<Dropdown.Item onClick={this.setTextStyle.bind(this, 'h4')}>
										<Header as="h4">Header H4</Header>
									</Dropdown.Item>
									<Dropdown.Item onClick={this.setTextStyle.bind(this, 'h5')}>
										<Header as="h5">Header H5</Header>
									</Dropdown.Item>
									<Dropdown.Item onClick={this.setTextStyle.bind(this, 'h6')}>
										<Header as="h6">Header H6</Header>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<Button icon="bold" onClick={this.setTextStyle.bind(this, 'bold')} />
							<Button icon="italic" onClick={this.setTextStyle.bind(this, 'italic')} />
							<Button icon="strikethrough" onClick={this.setTextStyle.bind(this, 'striketrough')} />
						</Button.Group>
					</Menu.Item>
					<Menu.Item>
						<Button.Group basic size="small">
							<Button icon="linkify" onClick={this.setTextStyle.bind(this, 'link')} />
							<Button icon="quote right" onClick={this.setTextStyle.bind(this, 'quote')} />
							<Button icon="code" onClick={this.setTextStyle.bind(this, 'code')} /> />
							<Button icon="image" onClick={this.setTextStyle.bind(this, 'image')} /> />
						</Button.Group>
					</Menu.Item>
					<Menu.Item>
						<Button.Group basic size="small">
							<Button icon="list ul" onClick={this.setTextStyle.bind(this, 'list-ul')} />/>
							<Button icon="list ol" onClick={this.setTextStyle.bind(this, 'list-ol')} />/>
							<Button icon="tasks" onClick={this.setTextStyle.bind(this, 'tasks')} />/>
						</Button.Group>
					</Menu.Item>
					<Menu.Menu position="right">
						<Menu.Item>
							<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="blank">
								Markdown Cheatsheet
							</a>
						</Menu.Item>
					</Menu.Menu>
				</Menu>
				<Segment attached>
					{showPreview ? (
						<ReactMarkdown source={value} />
					) : (
						<Form>
							<TextArea
								ref="editorText"
								rows={12}
								onChange={this.changeText.bind(this)}
								value={value}
								placeholder="Tell us more"
							/>
						</Form>
					)}
				</Segment>
				<Menu borderless attached>
					<Menu.Menu position="right">
						<Menu.Item>
							<Button onClick={this.saveMessage.bind(this)}>Save</Button>
						</Menu.Item>
					</Menu.Menu>
				</Menu>
			</Segment>
		);
	}
}

export default TextEditor;
