import React, { Component } from 'react';

const highlightedStyle = {
	color: 'white',
	backgroundColor: 'black'
};

class Tile extends Component {
	render() {
		const { allowedMoves, highlighted, tileActions, tileIndex, tileNumber } = this.props;
		// console.log(allowedMoves)
		const actionJsx = [];
		allowedMoves.forEach(moveName => {
			if (moveName === 'left') {
				actionJsx.push(<button onClick={() => tileActions.leftMove(tileIndex)}>Left</button>)
			}
			if (moveName === 'right') {
				actionJsx.push(<button onClick={() => tileActions.rightMove(tileIndex)}>Right</button>)
			}
			if (moveName === 'up') {
				actionJsx.push(<button onClick={() => tileActions.upMove(tileIndex)}>Up</button>)
			}
			if (moveName === 'down') {
				actionJsx.push(<button onClick={() => tileActions.downMove(tileIndex)}>Down</button>)
			}
		});
		return (
			<>
				<div className="b4" style={highlighted ? highlightedStyle : undefined} onClick={this.handleClick} onKeyUp={this.handleKeyPress}>{tileNumber}</div>
				{actionJsx.map(action => action)}
			</>
		);
	}
}

export default Tile;
