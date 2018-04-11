import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Counter from './components/Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Game from './components/Game';
import './index.css';

const initialState = {
    count: 0,
    past: [],
    future: [],
    squares: Array(9).fill(null),
    stepNumber: 0,
    xisNext: true,
    fontCurrent: 'normal'
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
      var pastState = {
          squares: state.squares,
          stepNumber: state.stepNumber,
          xisNext: action.isNext,
      }
      console.log("stepNumber:" + state.stepNumber);
      if (state.stepNumber < state.past.length) {
          console.log("stepNumber is: " + state.stepNumber + "past.length: " + state.past.length);
          state.past.splice(0, state.stepNumber);
          console.log(state.past);
      }

      return Object.assign({}, state, {
          past: state.past.concat(pastState),
          squares: newSquares,
          stepNumber: state.stepNumber + 1,
          xisNext: !action.isNext
      });

  case 'JUMPTO':
      console.log("I jumped to move: " + action.index);
      var futureState = state.future;
      var oldCurrent = {
          squares: state.squares,
          stepNumber: state.stepNumber,
          xisNext: state.xisNext
      };
      var pastIncludingCurrent = state.past.concat(oldCurrent);
      console.log("Pastincludingcurrent: ");
      console.log(pastIncludingCurrent);
      var newCurrent = pastIncludingCurrent[action.index];
      console.log("newCurrent: ");
      console.log(newCurrent);

      if (state.past.length == state.stepNumber) {
          futureState = {
              squares: state.squares,
              stepNumber: state.stepNumber,
              xisNext: action.isNext,
          };
          
      }

      if (action.index == state.past.length) {
          return Object.assign({}, state, {
              squares: state.future.squares,
              stepNumber: state.future.stepNumber,
              xisNext: state.future.xisNext
          });
      }

      return Object.assign({}, state, {
          squares: newCurrent.squares,
          stepNumber: newCurrent.stepNumber,
          xisNext: newCurrent.xisNext,
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
