import React from 'react';
import Square from './Square';
import { connect } from 'react-redux';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)}/>
        )
    }

    render(){
      return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)} 
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
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


export default connect(mapStateToProps)(Board);
