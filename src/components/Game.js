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
            console.log("I a x");
            return location + " set to: " + "X";
        } else {
            console.log("I am O");
            return location + " set to: " + "O";
        }
    }

    render() {
        const current = {
            squares: this.props.squares,
            stepNumber: this.props.stepNumber,
            move: this.props.move,
            xisNext: this.props.xisNext
        };
        const history = this.props.past;
        const allMoves = history.concat(current);
        console.log("all moves");
        console.log(allMoves);
        const moves = allMoves.map((step, move) => {
//            var desc;
//            console.log("move: ");
//            console.log(allMoves[move]);
            //            const desc = move ?

            const desc = allMoves[move].move == "Go to game start" ? "Go to game start" :
                  'Go to move #' + move + ": " + allMoves[move].move;
//                  this.props.past[move].move;
            return (
                <li key={move}>
                  <button style={{fontWeight: 'bold'}} onClick={() => this.jumpTo(move)}>
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
      fontCurrent: 'normal'
  };
}

export default connect(mapStateToProps)(Game);
