import React from 'react'
import { withRouter } from 'react-router'

class Navbar extends React.Component {
	constructor(props) {
		super(props)

		this.handleBack = this.handleBack.bind(this)
	}

	handleBack() {
		this.props.history.push('/')
	}

	render() {
		const path = this.props.location.pathname
		const rgxMoviesSubpage = /(?<=\/movies\/).*$/g || [] /* this regex matches everything after /movies/ in url */

		const main = (
			<div>
				<span>PLENTY OF MOVIES</span>
				<button onClick={this.props.handleSettingsTurnOn}>=</button>
			</div>
		)

		const movies = (
			<div> 
				<button onClick={this.handleBack}>←</button>
				<span>{path.match(rgxMoviesSubpage) !== null ? path.match(rgxMoviesSubpage)[0].toUpperCase() : null} MOVIES</span>
				<button onClick={this.props.handleSettingsTurnOn}>=</button>
			</div>
		)

		return (
			<div className='navbar'>
				{path === '/' ? main : movies }
			</div>
		)
	}
}

export default withRouter(Navbar)