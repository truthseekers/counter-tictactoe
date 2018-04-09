import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';

class Game extends React.Component {

    handleClick(i) {
        //console.log("in handleclick");
        //console.log(this.props.squares);
       const squares = this.props.squares.slice();
        squares[i] = this.props.xisNext ? 'X' : 'O';
        //console.log(squares);
        this.props.dispatch({ type: 'CLICKSQUARE', index: i, newSquares: squares, isNext: this.props.xisNext })
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
      squares: state.history.squares,
      /*history: {
          squares: state.history.squares,
      },*/
      stepNumber: 0,
      xisNext: state.xisNext,
      fontCurrent: 'normal'
  };
}

export default connect(mapStateToProps)(Game);
