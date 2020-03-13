import React, { createRef } from 'react'
import BottomPanel from './BottomPanel'
import Draggable from 'react-draggable'

class Card extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			x: 0,
			y: 0,
			swipeText: '',
			movie: {}
		}

		this.onDragStop = this.onDragStop.bind(this)
		this.handleDrag = this.handleDrag.bind(this)
		this.getRandomMovie = this.getRandomMovie.bind(this)

		this.refDraggable = createRef()
		this.refCard = createRef()
	}

	componentDidMount() {
		this.getRandomMovie()
	}

	getRandomMovie() {
		const rand = Math.floor(Math.random()*9999999).toString(10).padStart(7, '0')
		fetch(`https://www.omdbapi.com/?i=tt${rand}&apikey=${process.env.REACT_APP_API_KEY}`).then((res, rej) => {
			return res.json()
		}).then((movie) => {
			if(movie.Response === "False") return this.getRandomMovie()
			this.setState({ movie })
		})
	}

	handleDrag(e, ui) {
		this.setState(state => ({
			x: state.x + ui.deltaX,
			y: state.y + ui.deltaY,
		}))
		this.props.onCardDrag(this.state.x, this.state.y)
		if(this.state.y > 120) {
			this.setState({ swipeText: 'SEEN' })
		} else if(this.state.x < -30) {
			this.setState({ swipeText: 'NO' })
		} else if(this.state.x > 30) {
			this.setState({ swipeText: 'YES' })
		} else this.setState({ swipeText: '' })
	}

	onDragStop(e, ui) {
		this.setState({
			x: 0,
			y: 0,
			swipeText: ''
		})
		this.refDraggable.current.state.x = 0;
		this.refDraggable.current.state.y = 0;
		this.props.onCardDrag(0, 0) // * reset the background gradient
		this.getRandomMovie()
	}

	render() {
		return (
			<div>
				<Draggable ref={this.refDraggable} onDrag={this.handleDrag} onStop={(e, ui) => this.onDragStop(e, ui)}>
					<div> {/* * this div takes the Draggable's transform: translate() proprty so .card(below) can use transform: rotate() separately */}
						<div className='card' ref={this.refCard} style={{transform: `rotate(${this.state.x / 20}deg)`}}>
							<div className='cardMain'>
								{this.state.movie.Title}
							</div>
							<div className='cardBottom'>
								<BottomPanel />
							</div>
						</div>
					</div>
				</Draggable>
				<div className='swipeText'>{this.state.swipeText}</div>
			</div>
		)
	}
}

export default Card