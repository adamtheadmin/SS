import React from 'react';
import state from '../state'

class Loading extends React.Component {
	constructor(){
		super()
	}
	componentDidMount(){
		setTimeout(this.close, 1000);
	}
	close(){
		state.set("loading", false)
	}
	render() {
		return <div className="loading">
		  <div className="circle"></div>
		</div>
	}
}

export default Loading;
