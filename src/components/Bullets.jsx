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
		this.state = state.getState()
		state.on('sendBullet', this.sbh = details => {
			this.bullets.push(<Bullet key={this.tracker} id={this.tracker} up={details.up} x={details.x} y={details.y} />)
			this.tracker++
			this.forceUpdate()
		})
		state.on('destroyBullet', this.dbh = bullet => {
			for(var x in this.bullets)
				if(this.bullets[x].props.id == bullet.props.id){
					this.bullets.splice(x, 1)
				}
			this.forceUpdate()
		})
	}

	componentWillUnmount(){
		state.off('sendBullet', this.sbh)
		state.off('destroyBullet', this.dbh)
	}

	render(){
		return <div>
			{this.bullets}
		</div>
	}
}

export default Bullets;
