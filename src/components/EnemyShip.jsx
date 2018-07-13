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
			image : "alien.png",
			class : ['enemy', 'ship']
		})
		this.props = props
		this.hp = 1;
		this.x = this.randomRange(0, state.get('windowWidth') - this.width)
		//setTimeout(() => this.explode(), 3000)
	}

	hit(by){
		if(by.class.indexOf("friendly") > -1 && by.class.indexOf("bullet") > -1){
			this.hp--
			if(!this.hp){
				this.explodeAndDestroy()
				state.increment('kills')
			}
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
