/*//===
	Bullet
*///===

import OSO from './OSO'
import state from '../state'

class Bullet extends OSO{
	constructor(props){
		super({
			width : 10,
			height : 30,
			x : -1000,
			y : -1000, 
			z : 5,
			image : props.up ? "bullet.png" : "bullet2.png",
			class : props.up ? ['friendly', 'bullet'] : ['enemy', 'bullet']
		})
		this.props = props 
		this.x = this.props.x
		this.y = this.props.y
	}

	explodeAndDestroy(){
		this.destroy()
	}

	explode(){
		//Bullets do not explode
		this.destroy()
	}

	destroy(){
		this.active = false
		state.emit("destroyBullet", this)
	}

	init(){
		this.tween(this.x, this.props.up ? -100 : state.get('windowHeight') + 100, 1000)
			.then(_ => this.destroy())
			.catch(_ => this.destroy())
	}
}

export default Bullet;
