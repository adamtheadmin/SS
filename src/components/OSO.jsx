/*//===
	On Screen Object
	Parent Node
*///===

import React from 'react'
import state from '../state'
import { tween } from 'shifty'
import Promise from 'bluebird'

class OSO extends React.Component{
	constructor(options){
		super()
		this.state = state.getState()
		this.width = 50
		this.height = 50
		this.image = "red.png"
		this.x = 1 //left
		this.y = 1 //top
		this.z = 1
		this.children = []
		this.timeouts = []
		this.movement = false
		//offload props
		for(var x in options)
			this[x] = options[x]

		if(!this.state.screen)
			state.set('screen', [])
	}

	randomRange(min, max){
		if(min >= max)
			throw new Error("Min range is greater than or equal to max")
		return Math.floor(Math.random() * max) + min
	}

	explodeAndDestroy(){
		if(this.movement)
			this.movement.cancel()
		this.explode()
		setTimeout(() => this.destroy(), 200)
	}

	explode(){
		if(this.exploding)
			return;
		this.exploding = true;
		var explosion = <div key="explosion" style={{
			background : "url('/images/explosion.gif')",
			width : 200,
			height : 247,
			position : 'absolute',
			top : -50,
			left : -40
		}} />
		this.children.push(explosion)
		var to = setTimeout(() => {
			this.children.splice(this.children.indexOf(explosion), 1)
			this.timeouts.splice(this.timeouts.indexOf(to), 1)
			this.forceUpdate()
			this.exploding = false
		}, 1300)
		this.timeouts.push(to)
		this.forceUpdate()
	}

	isCollision(){
		var screen = state.get('screen'),
			rect1 = this
		for(var x in screen){
			var rect2 = screen[x]
			if(rect1 === rect2)
				continue;
			if (rect1.x < rect2.x + rect2.width &&
			   rect1.x + rect1.width > rect2.x &&
			   rect1.y < rect2.y + rect2.height &&
			   rect1.height + rect1.y > rect2.y) {
			    return rect2;
			}
		}
		return false
	}

	hit(){}

	tween(x, y, duration){
		var ongoing = true,
			sentReject = false,
			p = new Promise((resolve, reject) => {
			tween({
				easing : false,
				from: {
					x: this.x,
					y: this.y
				}, 
				to: {
					x, y 
				},
				duration : duration || 1000,
				step : (s => {
					if(ongoing){
						this.x = s.x
						this.y = s.y
						this.forceUpdate()
						if(s.x == x && s.y == y){
							resolve()
							this.movement = false
						}
						var col = this.isCollision()
						if(col){
							this.hit(col)
							col.hit(this)
						}
					} else if(!sentReject){
						reject(new Error("The tween has been canceled"))
						sentReject = true;
					}
				}).bind(this)
			});
		})

		p.cancel = function(){
			ongoing = false
		}

		this.movement = p

		return p
	}

	init(){}
	deinit(){}

	componentDidMount(){
		this.state.screen.push(this)
		this.init()
	}

	componentWillUnmount(){
		this.state.screen.splice(this.state.screen.indexOf(this), 1)
		this.deinit()
		for(var x in this.timeouts)
			clearTimeout(this.timeouts[x])
	}

	destroy(){
		throw new Error("This element has no destroy function!!!")
	}

	render(){
		return <div className="oso" style={{
			width : `${this.width}px`,
			height : `${this.height}px`,
			left : `${this.x}px`,
			top : `${this.y}px`,
			background : `url(/images/${this.image})`,
			zIndex : this.z
		}}>{this.children}</div>
	}
}

export default OSO;
