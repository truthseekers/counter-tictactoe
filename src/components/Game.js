import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';

class Game extends React.Component {

    handleClick(i) {
        var moveState = this.calculateMoveState(this.props.xisNext, i);
        this.props.dispatch({ type: 'CLICKSQUARE', index: i, recentMove: moveState, isNext: this.props.xisNext, squares: this.props.squares })
    }

    jumpTo(i) {
        this.props.dispatch({ type: 'JUMPTO', index: i})
    }

    calculateMoveState(bool, location){
        if (bool) {
            return location + " set to: " + "X";
        } else {
            return location + " set to: " + "O";
        }
    }

    render() {
        const current = {
            squares: this.props.squares,
            stepNumber: this.props.stepNumber,
            move: this.props.move,
            fontState: this.props.fontState,
            xisNext: this.props.xisNext
        };
        const history = this.props.past;
        const allMoves = history;
        const moves = history.map((step, move) => {

            const desc = history[move].move == "Go to game start" ? "Go to game start" :
                  'Go to move #' + move + ": " + history[move].move;
            //                  this.props.past[move].move;
//            console.log(allMoves[move].fontState);
            return (
                <li key={move}>
                  <button style={{fontWeight: history[move].fontState}} onClick={() => this.jumpTo(move)}>
                    {desc}
                  </button>
                </li>
            );
        });
    return (
        <div className="game">
          <div className="game-board"/>
          <Board
            onClick={(i) => this.handleClick(i)}
            />
        <h2>Game</h2>
        <ol>
          {moves}
        </ol>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      squares: state.squares,
      past: state.past,
      stepNumber: state.stepNumber,
      move: state.move,
      xisNext: state.xisNext,
      fontState: state.fontState
  };
}

export default connect(mapStateToProps)(Game);
