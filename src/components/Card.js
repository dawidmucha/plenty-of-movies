import React, { createRef } from 'react'
import BottomPanel from './BottomPanel'
import Draggable from 'react-draggable'
import _ from 'lodash'

class Card extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			x: 0,
			y: 0,
			swipeText: '',
			movie: {},
			loadingMessage: '',
			movieDetails: false
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
		const rand = (Math.random()*10000000).toFixed(0).padStart(7, '0')
		// const rand = 1905041 // fast n furious 7
		fetch(`https://www.omdbapi.com/?i=tt${rand}&apikey=${process.env.REACT_APP_API_KEY}&r=json`).then(res => {
			return res.json()
		}).then((movie) => {
			console.log(movie.imdbID, rand)
			console.log(movie)
			if(
				movie.Response === "False" ||
				(movie.Type.toLowerCase() !== "series" && movie.Type.toLowerCase() !== "movie")
			) {
				console.log(this.state.loadingMessage)
				if(this.state.loadingMessage === 'Loading.') this.setState({ loadingMessage: 'Loading..'})
				else if(this.state.loadingMessage === 'Loading..') this.setState({ loadingMessage: 'Loading...'})
				else if(this.state.loadingMessage === 'Loading...') this.setState({ loadingMessage: 'Loading.'})
				else this.setState({ loadingMessage: 'Loading.'})

				return this.getRandomMovie()
			}
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
			y: 0
		})
		this.refDraggable.current.state.x = 0;
		this.refDraggable.current.state.y = 0;
		this.props.onCardDrag(0, 0) // * reset the background gradient
		
		if(this.state.swipeText !== '') {
			this.setState({
				swipeText: '',
				movie: {},
				movieDetails: false
			})
			this.getRandomMovie()
		}
	}

	render() {
		return (
			<div>
				<Draggable ref={this.refDraggable} onDrag={this.handleDrag} onStop={(e, ui) => this.onDragStop(e, ui)}>
					<div> {/* //* this div takes the Draggable's transform: translate() proprty so .card(below) can use transform: rotate() separately */}
						<div className='card' ref={this.refCard} style={{transform: `rotate(${this.state.x / 20}deg)`}}>
							<div className='cardMain' style={{background: `linear-gradient(to top, rgb(0, 0, 0) 15%, rgba(0, 0, 0, 0.2) 80%), url(${this.state.movie.Poster}) #111`}}>
								{_.isEmpty(this.state.movie) ? <div>{this.state.loadingMessage}</div> : (
									this.state.movieDetails === false ? (
										<div onClick={() => this.setState({ movieDetails: true })}>
											<div>{this.state.movie.Title}</div>
											<div>({this.state.movie.Year})</div>
											<div>dir. {this.state.movie.Director}</div>
										</div>
									) : (
										<div onClick={() => this.setState({ movieDetails: false })}>
											<div>
												<div>{this.state.movie.Title}</div>
												<div>({this.state.movie.Year})</div>
												{this.state.movie.totalSeasons ? <div>{this.state.movie.totalSeasons} seasons</div> : null}
												{this.state.movie.Director === 'N/A' ? null : <div>Writer: {this.state.movie.Director}</div>}
												{this.state.movie.Writer === 'N/A' ? null : <div>Writer: {this.state.movie.Writer}</div>}
												{this.state.movie.Actors === 'N/A' ? null : <div>Starrting {this.state.movie.Actors}</div>}
												{this.state.movie.Runtime === 'N/A' ? null : <div>Runtime: {this.state.movie.Runtime}</div>}
												{this.state.movie.Genre === 'N/A' ? null : <div>Genre: {this.state.movie.Genre}</div>}
												<div>
													{this.state.movie.Ratings.map(rating => {
														return (
															<div>
																<div>{rating.Source}</div>
																<div>{rating.Value}</div>
															</div>
														)
													})}
												</div>
												{this.state.movie.Plot === 'N/A' ? null : <div>{this.state.movie.Plot}</div>}
												{this.state.movie.Awards === 'N/A' ? null : <div>{this.state.movie.Awards}</div>}
												
											</div>
										</div>
									)
								)}
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