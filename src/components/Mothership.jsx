/*//===
	Enemy MotherShip
*///===

import OSO from './OSO'
import state from '../state'

class EnemyShip extends OSO{
	constructor(props){
		super({
			width : 250,
			height : 177,
			x : 100,
			y : -177,
			image : "mothership.gif",
			class : ['enemy', 'mothership']
		})
		this.props = props
		this.state = state.getState()
		this.hp = 150;
		this.x = this.calculateSpawnX()
		this.guns = [
			{x : 0, y : 153},
			{x : 68, y : 135},
			{x : 126, y : 183},
			{x : 190, y : 128},
			{x : 246, y : 141}
		]
		this.gun = 0;
		this.timeouts.push(setTimeout(_ => {
			this.timeouts.push(setInterval(_ => {
				this.shoot()
			}, 250))
		}, 1000))

		this.timeouts.push(setTimeout(_ => {
			if(this.movement)
				this.movement.cancel()
			this.init()
		}, 1700))
	}

	calculateSpawnX(){
		let sl = this.state.shipLocation,
			init = sl.x - 75

		if(init < 0)
			init = 0

		if(init > this.state.windowWidth)
			init = this.state.windowWidth - this.width

		return init;
	}

	shoot(){
		var offset = this.guns[this.gun]
		state.emit('sendBullet', {
			up : false,
			x : this.x + offset.x,
			y : this.y + offset.y,
			duration : 1000
		})
		this.gun++
		if(!(this.gun in this.guns))
			this.gun = 0
	}

	hit(by){
		if(by.class.indexOf("friendly") > -1){
			this.hp--
			if(this.hp <= 0){
				this.explodeAndDestroy()
				state.increment('kills')
			}
		}

		if(by.class.indexOf("friendly") > -1 && by.class.indexOf("bullet") > -1){
			by.destroy()
		}
	}

	destroy(){
		state.emit("destroyEnemy", this.props.id)
	}

	init(){
		this.tween(this.calculateSpawnX(), state.get('windowHeight'), 1000 * 7)
			.then(_ => this.destroy())
			.catch(e => {})
	}
}

export default EnemyShip;
