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
    saythis: "Hello there I like pie soooo much",
    squares: Array(9).fill(null)
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
      console.log("state is: ");
      console.log(state.squares);
      console.log(state.squares[action.index] = 'x');
      console.log(state.squares);
      return Object.assign({}, state, {
              squares: action.newSquares 
      });
          //squares: state.squares[action.index] = 'X'
      
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
