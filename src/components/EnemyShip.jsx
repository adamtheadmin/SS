/*//===
	EnemyShip
*///===

import OSO from './OSO'
import state from '../state'

class EnemyShip extends OSO{
	constructor(props){
		super({
			width : 128,
			height : 128,
			x : 0,
			y : -128,
			image : props.red || false ? "alien-red.png" : "alien.png",
			class : ['enemy', 'ship']
		})
		this.red = props.red || false
		this.props = props
		this.hp = props.hp || 1;
		this.x = this.randomRange(0, state.get('windowWidth') - this.width)
		if(this.red)
			this.timeouts.push(setInterval(_ => {
				this.shoot()
			}, 2500))
	}

	shoot(){
		state.emit('sendBullet', {
			up : false,
			x : this.x + Math.floor(this.width / 2),
			y : this.y + this.height
		})
	}

	hit(by){
		if(by.class.indexOf("friendly") > -1){
			this.explodeAndDestroy()
			state.increment('kills')
		}
	}

	destroy(){
		state.emit("destroyEnemy", this.props.id)
	}

	init(){
		this.tween(this.x, state.get('windowHeight'), 1000 * this.randomRange(5, 9))
			.then(_ => this.destroy())
			.catch(e => {})
	}
}

export default EnemyShip;
