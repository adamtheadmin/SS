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
			z : 10,
			image : "ship.png",
			class : ["friendly", "ship"]
		})
		this.ready = false
		this.bank = null
		state.set('health', 100)
		state.set('kills', 0)
		this.guns = [
			{x : 24, y : 75},
			{x : 50, y : 5},
			{x : 75, y : 75}
		]
		this.gun = 0;
		this.invincible = false
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

				case 72: //H Key
					state.toggle('HUD')
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

	takeDamage(amount){
		if(this.invincible)
			return
		this.invincible = true
		this.timeouts.push(setTimeout(_ => {
			this.invincible = false
		}, 1500))
		this.explode()
		state.set('health', this.state.health - amount)
		if(this.state.health <= 0)
			this.explodeAndDestroy()
	}

	hit(by){
		if(by.class.indexOf("friendly") > -1)
			return
		console.log("SHIP HIT BY " + by.class.join(" "))
		this.takeDamage(5)
		by.destroy()
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

	destroy(){
		this.tween(this.x + 150, this.state.windowHeight + 200, 1000)
			.then(_ => {
				state.set('message', "GAME OVER")
				setTimeout(() => {
					state.set('inGame', false)
				}, 1000 * 7)
			})
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
