import React, { Component } from 'react';

class Tile extends Component {
	state = {
		style: {
			color: 'black'
		}
	}
	handleClick = () => {
		this.setState({ style: { color: 'white' } });
	}
	render() {
		const { tileNumber } = this.props;
		return (
			<>
				<div className="b4" onClick={this.handleClick} onKeyUp={this.handleKeyPress}>{tileNumber}</div>
			</>
		);
	}
}

export default Tile;
