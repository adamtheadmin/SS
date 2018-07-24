import React from 'react'
import state from '../state'

class Selection extends React.Component{
	constructor(){
		super()
	}

	componentDidMount(){
		this.selected = state.get('menuOption') == this.props.id
		state.on('stateChange', this.listener = () => {
			this.selected = state.get('menuOption') == this.props.id
			this.forceUpdate()
		})
	}

	componentWillUnmount(){
		state.off('stateChange', this.listener)
	}

	render(){
		return <div className={`option ${this.selected ? 'active' : ''}`} onClick={this.props.action} onMouseOver={() => state.set('menuOption', this.props.id)}>
			{this.props.name}
		</div>
	}
}

class Menu extends React.Component{
	constructor(){
		state.set('menuOption', 0)
		super()

		//skip menu
		//state.set('inGame', true)
		this.options = [
			{
				name : "Start Game",
				call : () => state.set('inGame', true)
			},
			{
				name : "Github",
				call : () => window.open("https://github.com/lilglower/SS")
			}
		]

		if(window.parent)
			this.options.push({
				name : "Fullscreen",
				call : () => window.open("https://ss.adamfowler.net")
			})
	}

	renderSelection(){
		var options = []
		for(var x in this.options){
			let option = this.options[x]
			options.push(<Selection id={x} key={x} name={option.name} action={option.call} />)
		}
		return options
	}

	componentDidMount(){
		document.querySelector('body').onkeydown = e => {
			var option = state.get('menuOption')
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
		return <div className="mainMenu">
			    <div className="menu">
			    	<h1>SS</h1>
			    	<h2>SPACE SHOOTER</h2>
			    	{this.renderSelection()}
			    	<br />
			    	<hr />
			    	<h3>(C) Copyright 2018 By Adam Fowler. All Rights Reserved.</h3>
			    	<h3>Made with React + Webpack</h3>
			    </div>
			  </div>
	}
}

export default Menu;
