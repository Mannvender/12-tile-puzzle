import React, { Component } from 'react';
import './App.css';
import './material-kit.css';

import Tile from './components/Tile';

class App extends Component {
	state = {
		tilesInfo: null,
		tilePostionFromUser: ''
	}

	componentDidMount() {
		const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		const shuffledArray = this.shuffleArray(array);
		const tilesInfo = {};
		for (let tileIndex = 0; tileIndex < 12; tileIndex++) {
			if (tileIndex === 11) {
				tilesInfo[tileIndex] = null;
			} else {
				tilesInfo[tileIndex] = shuffledArray[tileIndex];
			}
		}
		this.setState({ tilesInfo });
	}

	checkForWin = () => {
		// FIXME: edge cases
		const { tilesInfo } = this.state;
		let userWon = true;
		for (let i = 0; i < 11; i++) {
			if (tilesInfo[i] !== i + 1) userWon = false;
		}
		return userWon;
	}

	handleLeftBtnClick = () => {
		const { tilePostionFromUser } = this.state;
		this.moveTileToLeft(tilePostionFromUser - 1);
	}

	handleRightBtnClick = () => {
		const { tilePostionFromUser } = this.state;
		console.log(tilePostionFromUser)
		this.moveTileToRight(tilePostionFromUser - 1);
	}

	handleUpBtnClick = () => {
		const { tilePostionFromUser } = this.state;
		this.moveTileToUp(tilePostionFromUser - 1);
	}

	handleDownBtnClick = () => {
		const { tilePostionFromUser } = this.state;
		this.moveTileToDown(tilePostionFromUser - 1);
	}

	handleTilePostionInpChange = e => {
		const userInp = parseInt(e.target.value)
		if (userInp > 0 && userInp < 13) {
			this.setState({ tilePostionFromUser: parseInt(e.target.value) })
		}
		if (Boolean(userInp) === false) {
			this.setState({ tilePostionFromUser: '' })
		}
	}

	moveTileToLeft = tileIndex => {
		if (Boolean(tileIndex) === false) return;
		// tiles on extreme left can't move left
		const illegalIndices = [0, 4, 8];
		if (illegalIndices.indexOf(tileIndex) > -1) return;

		const { tilesInfo } = this.state;
		const destinationIndex = tileIndex - 1;
		// check if move allowed
		if (Boolean(tilesInfo[destinationIndex]) === false) {
			// swap tile numbers
			tilesInfo[destinationIndex] = tilesInfo[tileIndex];
			tilesInfo[tileIndex] = null;
		}
		if (this.checkForWin) alert('Hey you won, have a nice day')
		this.setState({ tilesInfo });
	}

	moveTileToRight = tileIndex => {
		if (Boolean(tileIndex) === false) return;
		// tiles on extreme right can't move right
		const illegalIndices = [3, 7, 11];
		if (illegalIndices.indexOf(tileIndex) > -1) return;

		const { tilesInfo } = this.state;
		const destinationIndex = tileIndex + 1;
		// check if move allowed
		if (Boolean(tilesInfo[destinationIndex]) === false) {
			// swap tile numbers
			tilesInfo[destinationIndex] = tilesInfo[tileIndex];
			tilesInfo[tileIndex] = null;
		}
		this.setState({ tilesInfo });
	}

	moveTileToUp = tileIndex => {
		if (Boolean(tileIndex) === false) return;
		// tiles on extreme Up can't move up
		const illegalIndices = [0, 1, 2, 3];
		if (illegalIndices.indexOf(tileIndex) > -1) return;

		const { tilesInfo } = this.state;
		const destinationIndex = tileIndex - 4;
		// check if move allowed
		if (Boolean(tilesInfo[destinationIndex]) === false) {
			// swap tile numbers
			tilesInfo[destinationIndex] = tilesInfo[tileIndex];
			tilesInfo[tileIndex] = null;
		}
		this.setState({ tilesInfo });
	}

	moveTileToDown = tileIndex => {
		if (Boolean(tileIndex) === false) return;
		// tiles on extreme down can't move down
		const illegalIndices = [8, 9, 10, 11];
		if (illegalIndices.indexOf(tileIndex) > -1) return;

		const { tilesInfo } = this.state;
		const destinationIndex = tileIndex + 4;
		// check if move allowed
		if (Boolean(tilesInfo[destinationIndex]) === false) {
			// swap tile numbers
			tilesInfo[destinationIndex] = tilesInfo[tileIndex];
			tilesInfo[tileIndex] = null;
		}
		this.setState({ tilesInfo });
	}

	shuffleArray = array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	swapTileNumbers = () => {

	}
	render() {
		const { tilesInfo, tilePostionFromUser } = this.state;
		return (
			<div className="App h-100 container">
				<div className="row w-100 mt-5" style={{ height: '30vh' }}>
					<div className="col-3">
						<Tile tileIndex={0} tileNumber={tilesInfo ? tilesInfo[0] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={1} tileNumber={tilesInfo ? tilesInfo[1] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={2} tileNumber={tilesInfo ? tilesInfo[2] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={3} tileNumber={tilesInfo ? tilesInfo[3] : undefined} />
					</div>
				</div>
				<div className="row w-100" style={{ height: '30vh' }}>
					<div className="col-3">
						<Tile tileIndex={4} tileNumber={tilesInfo ? tilesInfo[4] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={5} tileNumber={tilesInfo ? tilesInfo[5] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={6} tileNumber={tilesInfo ? tilesInfo[6] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={7} tileNumber={tilesInfo ? tilesInfo[7] : undefined} />
					</div>
				</div>
				<div className="row w-100" style={{ height: '30vh' }}>
					<div className="col-3">
						<Tile tileIndex={8} tileNumber={tilesInfo ? tilesInfo[8] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={9} tileNumber={tilesInfo ? tilesInfo[9] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={10} tileNumber={tilesInfo ? tilesInfo[10] : undefined} />
					</div>
					<div className="col-3">
						<Tile tileIndex={11} tileNumber={tilesInfo ? tilesInfo[11] : undefined} />
					</div>
				</div>
				<input className="w-100 my-3"
					onChange={e => this.handleTilePostionInpChange(e)}
					placeholder='enter postion you want to move, position range 1-12, left-right top-down'
					type="number"
					value={tilePostionFromUser} />
				<button onClick={this.handleLeftBtnClick}>Left</button>
				<button onClick={this.handleRightBtnClick}>Right</button>
				<button onClick={this.handleUpBtnClick}>Up</button>
				<button className="mb-5" onClick={this.handleDownBtnClick}>Down</button>
			</div>
		);
	}
}

export default App;
