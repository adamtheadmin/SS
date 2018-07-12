import React from 'react';
import state from './state';
import Menu from './components/Menu';
import Loading from './components/Loading';
import Game from './components/Game';

import "styles/base/_main.sass"

class App extends React.Component {
	constructor(){
		// alert("hey")
		//this.state = state;
		// setInterval(() => {
		// 	this.forceUpdate();
		// }, 1000)
		super()
		this.state = state.getState()
	}
	componentDidMount(){
		state.on('stateChange', state => {
			//alert("Got state change")
			this.forceUpdate()
		})
	}
	moveOn(){
		state.set('loading', true)
		state.set('inGame', false)
	}

	render() {
		return <div className='App'>
			{this.state.loading ? <Loading /> : <span></span>}
			{!this.state.loading && !this.state.inGame ? <Menu /> : <span></span>}
			{!this.state.loading && this.state.inGame ? <Game /> : <span></span>}
			<button onClick={this.moveOn}>Click Here to Continue</button>
		</div>
	}
}

export default App;
