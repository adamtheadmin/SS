/*//===
	Waves Manager
*///===
import React from 'react'
import state from '../state'
import EnemyShip from './EnemyShip'
import Mothership from './Mothership'
import Promise from 'bluebird'

class Waves extends React.Component{
	constructor(){
		super()
		state.set('wave', 0)
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
			clearTimeout(this.intervals[x])
		this.intervals = []
	}

	componentWillUnmount() {
		state.off("destroyEnemy", this.destroyEnemyCallback)
		this.clearIntervals()
	}

	waitForWave(){
		return new Promise(resolve => {
			this.intervals.push(this.checkInterval = setInterval(_ => {
				if(!this.enemies.length && !this.spawning){
					clearTimeout(this.checkInterval)
					resolve()
				}
			}, 1000 * 5))
		})
	}

	stopSpawn(timeout){
		this.intervals.push(setTimeout(_ => {
			this.spawning = false;
			clearTimeout(this.waveInterval)
		}, timeout))
	}

	startWave(){
		state.increment('wave')
		state.set('message', `START WAVE ${state.get('wave')}`)
		switch(state.get('wave')){
			case 1:
				this.intervals.push(this.waveInterval = setInterval(_ => {
					this.spawning = true;
					this.enemies.push(<EnemyShip key={this.eCounter} id={this.eCounter} hp={1} red={false} />)
					this.eCounter++
					this.forceUpdate()
				}, 1000 * 3))

				this.stopSpawn(1000 * 20)

				this.waitForWave()
					.then(_ => this.startWave())
			break;

			case 2:
				this.intervals.push(this.waveInterval = setInterval(_ => {
					this.spawning = true;
					this.enemies.push(<EnemyShip key={this.eCounter} id={this.eCounter} hp={1} red={true} />)
					this.eCounter++
					this.forceUpdate()
				}, 1000 * 2))


				this.stopSpawn(1000 * 50)

				this.waitForWave()
					.then(_ => this.startWave())
			break;

			case 3:
				var enemyToggle = true;
				this.intervals.push(this.waveInterval = setInterval(_ => {
					this.spawning = true;
					this.enemies.push(<EnemyShip key={this.eCounter} id={this.eCounter} hp={1} red={enemyToggle} />)
					enemyToggle = !enemyToggle
					this.eCounter++
					this.forceUpdate()
				}, 1000 * 1))


				this.stopSpawn(1000 * 40)

				this.waitForWave()
					.then(_ => this.startWave())
			break;

			case 4:
				var c = 1;
				this.intervals.push(this.waveInterval = setInterval(_ => {
					this.spawning = true;
					switch(c){
						case 1:
							this.enemies.push(<Mothership key={this.eCounter} id={this.eCounter} hp={50} />)
						break;

						case 2:
							this.enemies.push(<EnemyShip key={this.eCounter} id={this.eCounter} hp={1} red={true} />)
						break;

						case 3:
							this.enemies.push(<EnemyShip key={this.eCounter} id={this.eCounter} hp={1} red={false} />)
						break;

						case 4:
							this.enemies.push(<EnemyShip key={this.eCounter} id={this.eCounter} hp={1} red={true} />)
						break;

						default:
							c = 0;
						break;
					}
					this.eCounter++
					c++
					this.forceUpdate()
				}, 1500))

				this.stopSpawn(1000 * 40)

				this.waitForWave()
					.then(_ => this.startWave())
			break;

			case 5:
				this.intervals.push(this.waveInterval = setInterval(_ => {
					this.spawning = true;
					this.enemies.push(<Mothership key={this.eCounter} id={this.eCounter} hp={50} />)
					this.eCounter++
					this.forceUpdate()
				}, 1000 * 5))

				this.stopSpawn(1000 * 60 * 2)

				this.waitForWave()
					.then(_ => this.startWave())
			break;

			default:
				state.set('message', "YOU WIN")
				this.intervals.push(setTimeout(_ => {
					state.set('inGame', false)
				}, 1000 * 2))
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
