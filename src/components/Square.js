import React from 'react';

/*function Square(props) {
    console.log("rendered square: " + props.value);
    return (
        <button className="square" onClick={props.onClick}>
          {props.value}
          </button>
    );
}*/

class Square extends React.Component {
    render(){
        return (
        <button className="square" onClick={this.props.onClick}>
          {this.props.value}
        </button>
        );
    };
}


function mapStateToProps(state) {
  return {
      squares: state.squares,
      stepNumber: 0,
      xisNext: true,
      fontCurrent: 'normal'
  };
}

export default Square;
