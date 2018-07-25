/*//===
	Load Game Components
*///===

import React from 'react';
import state from '../state'
import eachSeries from 'async/eachSeries'
import Promise from 'bluebird'

Promise.config({
	warnings : false
})

class Loading extends React.Component {
	constructor(){
		super()
		this.elements = [
			'sky.jpg',
			'stars.jpg',
			'ship.png',
			'bullet.png',
			'bullet2.png',
			'alien.png',
			'alien-red.png',
			'explosion.gif',
			'mothership.gif'
		]
	}

	loadImage(src){
		return new Promise((resolve, reject) => {
			src = `/images/${src}`
		    var img = new Image();
		    img.src = src
		    img.onload = _ => resolve()
		})
	}

	componentDidMount(){
		eachSeries(this.elements, (image, nextImage) => {
			this.loadImage(image)
				.then(_ => nextImage())
				.catch(e => {
					throw new Error(`Loading Error: ${e.toString()}`)
				})
		}, () => this.close())
	}

	close(){
		state.set("loading", false)
	}
	render() {
		return <div className="loading">
		  <div className="circle"></div>
		</div>
	}
}

export default Loading;
