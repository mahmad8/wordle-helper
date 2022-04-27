import React, { Component } from "react";
import "./App.css";
import Square from "./Square";
import Guesses from "./Guesses";
import Solver from "./Solver";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(25).fill(0),
      letters: new Array(25).fill(''),
      result: [],
      index: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateLetter = this.updateLetter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.solver = new Solver();
  }

  // handleKeyDown(event) {
    // console.log('key down event ' + event);
  // }

  componentDidMount() {
    document.addEventListener('keydown', this.updateLetter)
    }
  
  updateLetter(event) {
    console.log('key update ' + event.key + ' ' + event.keyCode + ' alt: ' + event.altKey + ' meta: ' + event.metaKey);
    var newLetters = this.state.letters;
    var newIndex;
    const isLetter = /^[a-zA-Z]$/i.test(event.key)
    //event.keyCode >= 65 && event.keyCode <= 90
    if (isLetter && event.altKey === false && event.metaKey == false) {
      newLetters[this.state.index] = event.key.toUpperCase();
      newIndex = (this.state.index + 1) % 25;
    } else if (event.keyCode === 8) {
      var index = this.state.index;
      if (index !== 0) {
        newLetters[this.state.index - 1] = '';
        newIndex = index - 1;
      } else if (index === 0) {
        newLetters[0] = '';
        newIndex = 0;
      }
     } else {
      return;
    }
    var result = this.solver.solve(this.state.board, newLetters);
    console.log('result:' + result);
    this.setState({ letters: newLetters, index: newIndex, result: result });
  }

  updateLetter2(letter) {
    console.log('letter ' + letter);
    var newLetters = this.state.letters;
    var newIndex;
    const isLetter = /^[a-zA-Z]$/i.test(letter)
    if (isLetter) {
      newLetters[this.state.index] = letter.toUpperCase();
      newIndex = (this.state.index + 1) % 25;
    } else if (letter === '{bksp}') {
      var index = this.state.index;
      if (index !== 0) {
        newLetters[this.state.index - 1] = '';
        newIndex = index - 1;
      } else if (index === 0) {
        newLetters[0] = '';
        newIndex = 0;
      }
     } else {
      return;
    }
    var result = this.solver.solve(this.state.board, newLetters);
    console.log('result:' + result);
    this.setState({ letters: newLetters, index: newIndex, result: result });
  }

  
  // window.addEventListener('keydown', handleKeyDown);

  componentWillUnmount() {
      document.removeEventListener('keydown', this.updateLetter);
  }

 
  handleClick(i) {
    console.log('clicked button ' + i)
    var board = this.state.board;
    var v = this.state.board[i];
    v = v + 1;
    v = v % 4;
    board[i] = v;
    var result = this.solver.solve(board, this.state.letters);
    console.log('result:' + result);
    this.setState({ board: board, index: i, result: result })
  }

  clearBoard() {
    console.log('clearing board')
    var board = new Array(25).fill(0);
    var letters = new Array(25).fill('');
    this.setState({ board: board, letters: letters, index: 0});
  }

  onChange = (input) => {
    console.log("Input changed", input);
  }

  onKeyPress = (button) => {
    console.log("Button pressed", button);
    this.updateLetter2(button);
  }

  render() {
    return (
      <div className="App">
        <h2>Wordle Helper</h2>
         <div id="buttons" className="buttons">
           {this.state.board.map((x, i) => (
            <Square
              value={this.state.board[i]}
              letter={this.state.letters[i]}
              key={'board' + i}
              id={i}
              onClick={ (id) => this.handleClick(id) } />))}
        </div>
        <button 
        className="reset-button"
        onClick={this.clearBoard}>Reset</button>
        <Guesses
          value={this.state.result}
          readOnly={true}
          />
          <Keyboard
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        layout={{
          default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            'Z X C V B N M {bksp}'
          ]
        }}
      />
      </div>
    )}
}

export default App;
