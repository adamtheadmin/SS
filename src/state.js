/*//===
	State Management 
*///===

import ee from 'event-emitter'

class state {
	constructor(){
		this.state = {
			loading : true,
			inGame : false,
			HUD : true,
			width: window.innerWidth || document.body.clientWidth,
			height: window.innerHeight || document.body.clientHeight
		}

		window.addEventListener("resize", function () {
		    this.set('width', window.innerWidth || document.body.clientWidth)
		    this.set('height', window.innerHeight || document.body.clientHeight)
		    this.set('resize', true)
		}.bind(this));
	}

	get(key){
		if(key in this.state)
			return this.state[key];
		else throw new Error(`Key ${key} does not exist in the state.`)
	}

	increment(key){
		if(key in this.state)
			this.state[key]++
		this.refresh()
	}

	decrement(key){
		if(key in this.state)
			this.state[key]--
		this.refresh()
	}

	toggle(key){
		if(key in this.state)
			this.state[key] = !this.state[key];
		this.refresh()
	}

	set(key, value){
		this.state[key] = value;
		this.emit(key, value)
		this.refresh();
	}

	refresh(){
		this.emit("stateChange", this.state)
	}

	getState(){
		return this.state
	}
}

ee(state.prototype)

export default new state;