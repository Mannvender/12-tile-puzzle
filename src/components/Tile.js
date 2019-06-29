import React, { Component } from 'react';

const highlightedStyle = {
	color: 'white',
	backgroundColor: 'black'
};

class Tile extends Component {
	render() {
		const { highlighted, tileNumber } = this.props;
		return (
			<>
				<div className="b4" style={highlighted ? highlightedStyle: undefined} onClick={this.handleClick} onKeyUp={this.handleKeyPress}>{tileNumber}</div>
			</>
		);
	}
}

export default Tile;
