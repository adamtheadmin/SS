/*//===
	SpaceShip
	Main Character
*///===
import React from 'react'
import OSO from './OSO'
import state from '../state'

class Ship extends OSO{
	constructor(props){
		var s = state.getState()
		super({
			width : 110,
			height : 110,
			x : Math.floor(s.windowWidth / 2) - 50,
			y : s.windowHeight + 20, 
			z : 2,
			image : "ship.png",
			class : ["friendly", "ship"]
		})
		this.ready = false
		this.bank = null
		this.guns = [
			{x : 24, y : 75},
			{x : 50, y : 5},
			{x : 75, y : 75}
		]
		this.gun = 0;
	}

	assignControls(){
		var body = document.querySelector('body')
		body.onkeydown = e => {
			switch(e.which){
				case 32: //Spacebar
					this.shoot()
				break;

				case 37: //Left
					this.startBank(false)
				break;

				case 39: //Right
					this.startBank(true)
				break;
			}
		}

		body.onkeyup = e => {
			switch(e.which){
				case 32: //Spacebar
					this.shoot()
				break;

				case 37: //Left
					this.cancelBank()
				break;

				case 39: //Right
					this.cancelBank()
				break;
			}
		}
	}

	cancelBank(){
		if(this.bank)
			this.bank.cancel()
	}

	startBank(right){
		this.cancelBank()
		this.bank = this.tween(right ? this.state.windowWidth - this.width : 0, this.y, 800)
		this.bank.catch(_ => {})
	}

	hit(by){
		if(by.class.indexOf("enemy") > -1){
			this.explode()
			by.explodeAndDestroy()
		}
	}

	shoot(){
		var offset = this.guns[this.gun]
		state.emit('sendBullet', {
			up : true,
			x : this.x + offset.x,
			y : this.y + offset.y
		})
		this.gun++
		if(!(this.gun in this.guns))
			this.gun = 0
	}

	init(){
		this.tween(this.x, this.state.windowHeight - 120, 1000)
		.then(_ => {
			this.ready = true;
			this.assignControls()
		})
	}
}

export default Ship;
