import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';

class Game extends React.Component {

    handleClick(i) {
        //const squares = this.props.history[history.length - 1].squares;
        //squares[i] = this.props.xisNext ? 'X' : 'O';
        this.props.dispatch({ type: 'CLICKSQUARE', index: i, isNext: this.props.xisNext, squares: this.props.squares })
    }

    jumpTo(i) {
        this.props.dispatch({ type: 'JUMPTO', index: i})
    }

    render() {
        const current = {
            squares: this.props.squares,
            stepNumber: this.props.stepNumber,
            xisNext: this.props.xisNext
        };
        const history = this.props.past;
        //const allMoves = history.concat(current);
        const moves = history.map((step, move) => {
            const desc = move ?
                  'go to move #' + move :
                  'Go to game start';
            return (
                <li key={move}>
                  <button onClick={() => this.jumpTo(move)}>
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
      //      history: state.history,
      past: state.past,
      stepNumber: state.stepNumber,
      xisNext: state.xisNext,
      fontCurrent: 'normal'
  };
}

export default connect(mapStateToProps)(Game);
