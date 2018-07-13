/*//===
	Main Game Component
*///===

import React from 'react'
import state from '../state'
import OSO from './OSO'
import Ship from './Ship'
import Bullets from './Bullets'
import Waves from './Waves'
import HUD from './HUD'

class Game extends React.Component{
	constructor(){
		super()
		this.state = state.getState()
		state.set('windowWidth', this.state.width < 900 ? this.state.width - 20 : 900)
		state.set('windowHeight', this.state.height - 20)
		state.set('screen', [])
	}

	componentDidMount(){
		document.querySelector('body').onkeydown = e => {
			switch(e.which){
				case 38: //Up
					if(option - 1 > -1)
						state.set('menuOption', option - 1)
				break;

				case 40: //Down
					if(option + 1 < this.options.length)
						state.set('menuOption', option + 1)
				break;

				case 13: //Enter
					this.options[option].call()
				break;
			}
		}
	}

	render(){
		return <div className="game">
		<div className="mask" style={{top : `${this.state.windowHeight + 15}px`, }}></div>
			    <div className="window" style={{
					width : `${this.state.windowWidth}px`,
					height : `${this.state.windowHeight}px`,
				}}>
					{this.state.HUD ? <HUD /> : <span></span>}
			    	<Ship />
			    	<Waves />
			    	<Bullets />
			    </div>
			  </div>
	}
}

export default Game;
