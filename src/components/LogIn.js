import React from 'react'
import { firebase } from '../firebase/firebase'
require('firebase/auth')

class LogIn extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault()
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(err => console.log(err)).then(() => {
			console.log('logged in')
			return this.props.closeModal()
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					email <input type='email' name='email' onChange={this.handleChange} /> <br />
					password <input type='password' name='password' onChange={this.handleChange} /> <br />


					<button type='submit'>submit</button>
				</form>

				<br />
				{this.state.email} {this.state.password}
			</div>
		)
	}
}

export default LogIn