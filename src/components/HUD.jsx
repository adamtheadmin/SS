/*//===
	Heads Up Display
*///===

import React from 'react';
import state from '../state'
import Promise from 'bluebird'

class HUD extends React.Component {
	constructor(){
		super()
		this.state = state.getState()
		this.messageInterval = false
		state.set('message', false)
		state.on('stateChange', this.listener = state => {
			this.forceUpdate()
		})
		state.on('message', this.mlistener = state => {
			this.messageInterval = setTimeout(_ => {
				this.state.message = false
				this.forceUpdate()
			}, 2000)
		})
	}

	componentWillUnmount(){
		state.off('stateChange', this.listener)
		state.off('message', this.mlistener)
		if(this.messageInterval)
			clearTimeout(this.messageInterval)
	}

	getInformation(){
		return this.state.message ? this.state.message : `Power: ${this.state.health}%
		  	Wave :  ${this.state.wave}
		  	Kills: ${this.state.kills}`
	}

	render() {
		return <div className="HUD">
		  <div className="health">
		  	<div className="bar" style={{height : `${100 - this.state.health}%`}}></div>
		  </div>
		  <div className="information">
		  	{this.getInformation()}
		  </div>
		</div>
	}
}

export default HUD;
