import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';

class Game extends React.Component {

    handleClick(i) {
        console.log("in handleclick");
        const squares = this.props.squares.slice();
        console.log(squares);
        squares[i] = 'X';
        console.log(squares);
        this.props.dispatch({ type: 'CLICKSQUARE', index: i, newSquares: squares})
    }

  render() {
    return (
        <div className="game">
          <div className="game-board"/>
          <Board
            onClick={(i) => this.handleClick(i)}
            />
        <h2>Game</h2>
        <div>
          <span>I am a span in the game</span>
            {this.props.saythis}
            {this.props.stepNumber}
            {this.props.fontCurrent}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      saythis: state.saythis,
      squares: state.squares,
      stepNumber: 0,
      xisNext: true,
      fontCurrent: 'normal'
  };
}

export default connect(mapStateToProps)(Game);
