/*//===
	Bullets Manager
*///===
import React from 'react'
import state from '../state'
import Bullet from './Bullet'

class Bullets extends React.Component{
	constructor(){
		super()
		this.bullets = []
		this.tracker = 0;
		state.on('sendBullet', details => {
			this.bullets.push(<Bullet key={this.tracker} id={this.tracker} up={details.up} x={details.x} y={details.y} />)
			this.tracker++
			this.forceUpdate()
		})
		state.on('destroyBullet', key => {
			var search = this.bullets.filter(b => b.props.key == key)
			
			if(search.length)
				this.bullets.splice(this.bullets.indexOf(search[0]), 1)
			this.forceUpdate()
		})
	}

	render(){
		return <div>
			{this.bullets}
		</div>
	}
}

export default Bullets;
