import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Counter from './components/Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Game from './components/Game';
import './index.css';

const initialPast = {
    squares: Array(9).fill(null),
    move: 'Go to game start',
    stepNumber: 0,
    fontState: 'bold',
    xisNext: true,
}
const initialState = {
    count: 0,
    past: [initialPast],
    future: [],
    squares: Array(9).fill(null),
    move: 'Go to game start',
    stepNumber: 0,
    fontState: 'bold',
    xisNext: true,
};

function reducer(state = initialState, action) {
  switch(action.type) {
  case 'INCREMENT':
      return Object.assign({}, state, {
          count: state.count + 1
      })
      //return count: state.count + 1
  case 'DECREMENT':
      return Object.assign({}, state, {
          count: state.count - 1
      })
  case 'CLICKSQUARE':
      var newSquares = state.squares.slice();
      newSquares[action.index] = state.xisNext ? 'X' : 'O';
      var previousSquare = state.past.slice(-1);
      console.log("previousSquare: ");
      previousSquare[0].fontState = 'normal';
      var updatedHistory; //
      var pastState = {
          squares: newSquares,
          stepNumber: state.stepNumber + 1,
          move: action.recentMove,
          fontState: 'bold',
          xisNext: !action.isNext,
      }
      if (state.stepNumber + 1 < state.past.length) {
          state.past.splice(0, state.stepNumber);
      }

      return Object.assign({}, state, {
          past: state.past.concat(pastState),
          squares: newSquares,
          move: action.recentMove,
          stepNumber: state.stepNumber + 1,
          fontState: 'bold',
          xisNext: !action.isNext
      });

  case 'JUMPTO':
      var futureState = state.future;
      var oldCurrent = {
          squares: state.squares,
          stepNumber: state.stepNumber,
          xisNext: state.xisNext,
          fontState: 'normal'
      };
      console.log("jump to: ");
      state.past[state.stepNumber].fontState = 'normal';
//      state.past[state.past.length].fontState = 'normal';
      state.past[action.index].fontState = 'bold';
      var pastIncludingCurrent = state.past.concat(oldCurrent);
     // console.log("Pastincludingcurrent: ");
     // console.log(pastIncludingCurrent);
      var newCurrent = pastIncludingCurrent[action.index];
     // console.log("newCurrent: ");
     // console.log(newCurrent);

      if (state.past.length == state.stepNumber) {
//          console.log("state.past.length == state.stepNumber");
          futureState = {
              squares: state.squares,
              stepNumber: state.stepNumber,
              xisNext: action.isNext,
          };
          
      }

      if (action.index == state.past.length) {
          console.log("action.index == state.past.length");
          return Object.assign({}, state, {
              squares: state.future.squares,
              stepNumber: state.future.stepNumber,
              xisNext: state.future.xisNext
          });
      }

      console.log("returning... not in conditional");
      return Object.assign({}, state, {
          squares: newCurrent.squares,
          stepNumber: newCurrent.stepNumber,
          xisNext: newCurrent.xisNext,
          move: newCurrent.move,
          fontState: 'normal',
          future: futureState
      });
      
      
    default:
      return state;
  }
}

const store = createStore(reducer,
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

const App = () => (
  <Provider store={store}>
        <div><Counter/>
        <Game /></div>
  </Provider>
);

render(<App />, document.getElementById('root'));
