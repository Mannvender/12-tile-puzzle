import React, { Component } from 'react';
import './App.css';
import './material-kit.css';

import Tile from './components/Tile';

const rowStyle = { height: '30vh' };

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

	checkForWin = tilesInfo => {
		// TODO: look for edge cases
		let userWon = true;
		for (let i = 0; i < 11; i++) {
			if (tilesInfo[i] !== i + 1) userWon = false;
		}
		return userWon;
	}

	getAllowedActions = tileIndex => {
		const allowedMoves = [];
		const { tilesInfo } = this.state;
		if (Boolean(tilesInfo) === false) return allowedMoves;
		const rightBoundry = [3, 7, 11];
		const leftBoundry = [0, 4, 8];
		const topBoundry = [0, 1, 2, 3];
		const bottomBoundry = [8, 9, 10, 11];
		if (Boolean(tilesInfo[tileIndex + 1]) === false && rightBoundry.indexOf(tileIndex) === -1) {
			// rightMove is allowed
			allowedMoves.push('right');
		}
		if (Boolean(tilesInfo[tileIndex - 1]) === false && leftBoundry.indexOf(tileIndex) === -1) {
			// leftMove is allowed
			allowedMoves.push('left');
		}
		if (Boolean(tilesInfo[tileIndex - 4]) === false && topBoundry.indexOf(tileIndex) === -1) {
			// topMove is allowed
			allowedMoves.push('up');
		}
		if (Boolean(tilesInfo[tileIndex + 4]) === false && bottomBoundry.indexOf(tileIndex) === -1) {
			// bottomMove is allowed
			allowedMoves.push('down');
		}
		return allowedMoves;
	}

	handleLeftBtnClick = () => {
		const { tilePostionFromUser } = this.state;
		this.moveTileToLeft(tilePostionFromUser - 1);
	}

	handleRightBtnClick = () => {
		const { tilePostionFromUser } = this.state;
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
			this.setState({ tilePostionFromUser: parseInt(e.target.value) });
		}
		if (Boolean(userInp) === false) {
			this.setState({ tilePostionFromUser: '' });
		}
	}

	moveTileToLeft = sourceIndex => {
		if (sourceIndex !== 0 && Boolean(sourceIndex) === false) return;
		// tiles on extreme left can't move left
		const illegalIndices = [0, 4, 8];
		if (illegalIndices.indexOf(sourceIndex) > -1) return;

		const destinationIndex = sourceIndex - 1;
		this.swapTileNumbers(destinationIndex, sourceIndex);
	}

	moveTileToRight = sourceIndex => {
		if (sourceIndex !== 0 && Boolean(sourceIndex) === false) return;
		// tiles on extreme right can't move right
		const illegalIndices = [3, 7, 11];
		if (illegalIndices.indexOf(sourceIndex) > -1) return;

		const destinationIndex = sourceIndex + 1;
		this.swapTileNumbers(destinationIndex, sourceIndex);
	}

	moveTileToUp = sourceIndex => {
		if (sourceIndex !== 0 && Boolean(sourceIndex) === false) return;
		// tiles on extreme Up can't move up
		const illegalIndices = [0, 1, 2, 3];
		if (illegalIndices.indexOf(sourceIndex) > -1) return;

		const destinationIndex = sourceIndex - 4;
		this.swapTileNumbers(destinationIndex, sourceIndex);
	}

	moveTileToDown = sourceIndex => {
		if (sourceIndex !== 0 && Boolean(sourceIndex) === false) return;
		// tiles on extreme down can't move down
		const illegalIndices = [8, 9, 10, 11];
		if (illegalIndices.indexOf(sourceIndex) > -1) return;

		const destinationIndex = sourceIndex + 4;
		this.swapTileNumbers(destinationIndex, sourceIndex);
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

	swapTileNumbers = (destinationIndex, sourceIndex) => {
		const { tilesInfo } = this.state;
		// check if move allowed
		if (Boolean(tilesInfo[destinationIndex]) === false) {
			// swap tile numbers
			tilesInfo[destinationIndex] = tilesInfo[sourceIndex];
			tilesInfo[sourceIndex] = null;
		}
		if (this.checkForWin(tilesInfo)) alert('Hey you won, have a nice day');
		this.setState({ tilesInfo });
	}

	render() {
		const { tilesInfo, tilePostionFromUser } = this.state;
		const tileActions = {
			leftMove: this.moveTileToLeft,
			rightMove: this.moveTileToRight,
			upMove: this.moveTileToUp,
			downMove: this.moveTileToDown
		};
		return (
			<div className="App h-100 container">
				<div className="row w-100 mt-5" style={rowStyle}>
					{Array.from(Array(4).keys()).map(i =>
						<div className="col-3" key={i}>
							<Tile
								allowedMoves={this.getAllowedActions(i)}
								tileActions={tileActions}
								tileIndex={i}
								tileNumber={tilesInfo ? tilesInfo[i] : undefined}
								highlighted={tilePostionFromUser === i + 1}
							/>
						</div>
					)}
				</div>
				<div className="row w-100" style={rowStyle}>
					{Array.from(Array(4).keys()).map(i =>
						<div className="col-3" key={i + 4}>
							<Tile
								allowedMoves={this.getAllowedActions(i + 4)}
								tileActions={tileActions}
								tileIndex={i + 4}
								tileNumber={tilesInfo ? tilesInfo[i + 4] : undefined}
								highlighted={tilePostionFromUser === i + 5}
							/>
						</div>
					)}
				</div>
				<div className="row w-100" style={rowStyle}>
					{Array.from(Array(4).keys()).map(i =>
						<div className="col-3" key={i + 8}>
							<Tile
								allowedMoves={this.getAllowedActions(i + 8)}
								tileActions={tileActions}
								tileIndex={i + 8}
								tileNumber={tilesInfo ? tilesInfo[i + 8] : undefined}
								highlighted={tilePostionFromUser === i + 9}
							/>
						</div>
					)}
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
