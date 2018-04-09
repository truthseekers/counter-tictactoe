import React from 'react';
import { connect } from 'react-redux';
import Board from './Board';

class Game extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return (
        <div className="game">
          <div className="game-board"/>
            <Board />
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
      squares: Array(9).fill(null),
      stepNumber: 0,
      xisNext: true,
      fontCurrent: 'normal'
  };
}

export default connect(mapStateToProps)(Game);
