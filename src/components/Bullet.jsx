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
			image : props.up ? "bullet.png" : "bullet2.png",
			class : props.up ? ['friendly', 'bullet'] : ['enemy' : 'bullet']
		})
		this.props = props 
		this.x = this.props.x
		this.y = this.props.y
	}

	hit(by){
		if(by.class.indexOf("enemy") > -1){
			this.destroy()
		}
	}

	destroy(){
		state.emit("destroyBullet", this.props.id)
	}

	init(){
		this.tween(this.x, this.props.up ? -100 : state.get('windowHeight') + 100, 1000)
			.then(_ => this.destroy())
			.catch(e => {})
	}
}

export default Bullet;
