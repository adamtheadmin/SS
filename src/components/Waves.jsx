/*//===
	Waves Manager
*///===
import React from 'react'
import state from '../state'
import EnemyShip from './EnemyShip'

class Waves extends React.Component{
	constructor(){
		super()
		state.set('wave', 1)
		this.enemies = []
		this.intervals = []
		this.startWave()
		this.eCounter = 0;
		state.on("destroyEnemy", this.destroyEnemyCallback = id => {
			var search = this.enemies.filter(e => e.key == id)

			if(search.length)
				this.enemies.splice(this.enemies.indexOf(search[0]), 1)

			this.forceUpdate()
		})
	}

	componentWillMount(){

	}

	clearIntervals(){
		for(var x in this.intervals)
			clearInterval(this.intervals[x])
	}

	componentWillUnmount() {
		state.off("destroyEnemy", this.destroyEnemyCallback)
		this.clearIntervals()
	}

	startWave(){
		switch(state.get('wave')){
			case 1:
				this.intervals.push(setInterval(() => {
					this.enemies.push(<EnemyShip key={this.eCounter} id={this.eCounter} />)
					this.eCounter++
					this.forceUpdate()
				}, 1000 * 1))
			break;
		}
	}

	render(){
		return <div>
			{this.enemies}
		</div>
	}
}

export default Waves;
