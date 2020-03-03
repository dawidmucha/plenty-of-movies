import React from 'react'
import * as firebase from "firebase/app"

class SignUp extends React.Component {
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

	handleSubmit() {
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(err => console.log(err))
	}

	render() {
		return (
			<div>
				email <input type='email' name='email' onChange={this.handleChange} /> <br />
				password <input type='password' name='password' onChange={this.handleChange} /> <br />

				<button onClick={this.handleSubmit}>submit</button>
				<br />
				{this.state.email} {this.state.password}
			</div>
		)
	}
}

export default SignUp