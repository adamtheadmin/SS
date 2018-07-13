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
		state.set('message', false)
		state.on('stateChange', this.listener = state => {
			this.forceUpdate()
		})
	}

	componentWillUnmount(){
		state.off('stateChange', this.listener)
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
