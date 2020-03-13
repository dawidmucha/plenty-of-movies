import React from 'react'
import Card from '../components/Card'

class Main extends React.Component {
	constructor(props) {
		super(props)
	
		this.onCardDrag = this.onCardDrag.bind(this)

		this.refMain = React.createRef()
	}

	onCardDrag(x, y) {
		this.refMain.current.style.background = `
		linear-gradient(0deg, rgba(255,255,255,${(y-120)/40}), rgba(255,255,255,0) 90%),
			linear-gradient(-140deg, rgba(${255-(y/2)},50,50,${(x-40)/80}), rgba(${255-(y/2)},50,50,0) 80%),
			linear-gradient(140deg, rgba(${75-(y/5)},${75-(y/5)},${255-(y/2)},${(-x-40)/80}), rgba(${75-(y/5)},${75-(y/5)},${255-(y/2)},0) 80%)
			#111
		`
	}

	render() {
		return (
			<div className='main' ref={this.refMain}>
				<Card onCardDrag={(x, y) => this.onCardDrag(x, y)} />
			</div>
		)
	}
}

export default Main