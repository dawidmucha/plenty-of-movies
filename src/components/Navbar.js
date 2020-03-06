import React from 'react'
import { withRouter } from 'react-router'

class Navbar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const path = this.props.location.pathname
		const rgxMoviesSubpage = /(?<=\/movies\/).*$/g || [] /* this regex matches everything after /movies/ in url */

		const main = (
			<div>
				<span>PLENTY OF MOVIES</span>
				<button>=</button>
			</div>
		)

		const movies = (
			<div> 
				<button>←</button>
				<span>{path.match(rgxMoviesSubpage) !== null ? path.match(rgxMoviesSubpage)[0].toUpperCase() : null} MOVIES</span>
				<button>=</button>
			</div>
		)

		return (
			<div>
				{path === '/' ? main : movies }
			</div>
		)
	}
}

export default withRouter(Navbar)