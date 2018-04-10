import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';

class Game extends React.Component {

    handleClick(i) {
//        console.log("value of this.props.history.length - 1: ");
        const squares = this.props.history[this.props.history.length - 1].squares;
//        console.log("value of squares: ");
//        const squares = this.props.squares.slice();
//        console.log(squares);
        squares[i] = this.props.xisNext ? 'X' : 'O';
        this.props.dispatch({ type: 'CLICKSQUARE', index: i, newSquares: squares, isNext: this.props.xisNext, history: this.props.history })
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
          <span>say this: </span>
            {this.props.saythis}
          <span>stepNumber: </span>
            {this.props.stepNumber}
          <span>fontCurrent: </span>
            {this.props.fontCurrent}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      saythis: state.saythis,
      squares: state.history[state.history.length - 1].squares,
      history: state.history,
      stepNumber: 0,
      xisNext: state.xisNext,
      fontCurrent: 'normal'
  };
}

export default connect(mapStateToProps)(Game);
