/*//===
	Load Game Components
*///===

import React from 'react';
import state from '../state'
import eachSeries from 'async/eachSeries'
import Promise from 'bluebird'

class Loading extends React.Component {
	constructor(){
		super()
		this.elements = [
			'/images/sky.jpg',
			'/images/stars.jpg',
			'/images/ship.png',
			'/images/bullet.png',
			'/images/bullet2.png',
			'/images/alien.png',
			'/images/explosion.gif'
		]
	}

	loadImage(src){
		return new Promise(resolve => {
		    var img = new Image();
		    img.src = src
		    img.onload = resolve
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
