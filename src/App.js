import React, { Component } from "react";
import "./App.css";
import Square from "./Square";
import Guesses from "./Guesses";
import Solver from "./Solver";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

class App extends Component {
  constructor(props) {
    super(props);
    document.title = "Word Search Helper";
    this.state = {
      board: new Array(25).fill(0),
      letters: new Array(25).fill(''),
      result: [],
      index: 0,
      modalOpen: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateLetter = this.updateLetter.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.solver = new Solver();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.updateLetter)
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  updateLetter(event) {
    // console.log('key update ' + event.key + ' ' + event.keyCode + ' alt: ' + event.altKey + ' meta: ' + event.metaKey);
    var newLetters = this.state.letters;
    var newIndex;
    const isLetter = /^[a-zA-Z]$/i.test(event.key)
    //event.keyCode >= 65 && event.keyCode <= 90
    if (isLetter && event.altKey === false && event.metaKey === false) {
      newLetters[this.state.index] = event.key.toUpperCase();
      newIndex = (this.state.index + 1) % 25;
    } else if (event.keyCode === 8) {
      var index = this.state.index;
      if (this.state.letters[index] !== '') {
        newLetters[index] = '';
        if (index > 0) {
          newIndex = index - 1;
        }
      } else if (index !== 0) {
        newLetters[index - 1] = '';
        newIndex = index - 1;
      } else if (index === 0) {
        newLetters[0] = '';
        newIndex = 0;
      }
    } else {
      return;
    }
    var result = this.solver.solve(this.state.board, newLetters);
    // console.log('result:' + result);
    this.setState({ letters: newLetters, index: newIndex, result: result });
  }

  updateLetter2(letter) {
    // console.log('letter ' + letter);
    var newLetters = this.state.letters;
    var newIndex;
    const isLetter = /^[a-zA-Z]$/i.test(letter)
    if (isLetter) {
      newLetters[this.state.index] = letter.toUpperCase();
      newIndex = (this.state.index + 1) % 25;
    } else if (letter === '{bksp}') {
      var index = this.state.index;
      if (this.state.letters[index] !== '') {
        newLetters[index] = '';
        if (index > 0) {
          newIndex = index - 1;
        }
      } else if (index !== 0) {
        newLetters[index - 1] = '';
        newIndex = index - 1;
      } else if (index === 0) {
        newLetters[0] = '';
        newIndex = 0;
      }
    } else {
      return;
    }
    var result = this.solver.solve(this.state.board, newLetters);
    // console.log('result:' + result);
    this.setState({ letters: newLetters, index: newIndex, result: result });
  }


  // window.addEventListener('keydown', handleKeyDown);

  componentWillUnmount() {
    document.removeEventListener('keydown', this.updateLetter);
  }


  handleClick(i) {
    // console.log('clicked button ' + i)
    var board = this.state.board;
    var v = this.state.board[i];
    v = v + 1;
    v = v % 4;
    board[i] = v;
    var result = this.solver.solve(board, this.state.letters);
    // console.log('result:' + result);
    this.setState({ board: board, index: i, result: result })
  }

  clearBoard() {
    // console.log('clearing board')
    var board = new Array(25).fill(0);
    var letters = new Array(25).fill('');
    this.setState({ board: board, letters: letters, index: 0, result: [] });
  }

  onChange = (input) => {
    // console.log("Input changed", input);
  }

  onKeyPress = (button) => {
    // console.log("Button pressed", button);
    this.updateLetter2(button);
  }

  render() {
    return (
      <div className="App">
        <div className="top-bar">
          <h2 class="title">Word Search Helper</h2>
          <div class="help"><button class="help-button" onClick={this.openModal}>?</button></div>
        </div>
        <div id="buttons" className="buttons">
          {this.state.board.map((x, i) => (
            <Square
              value={this.state.board[i]}
              letter={this.state.letters[i]}
              key={'board' + i}
              id={i}
              onClick={(id) => this.handleClick(id)} />))}
        </div>
        <button
          className="reset-button"
          onClick={this.clearBoard}>Reset</button>
        <Guesses
          value={this.state.result.join(', ')}
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
        <Modal
          open={this.state.modalOpen}
          onClose={this.closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              How to use Word Search Helper
          </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Type your guesses into the squares.</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>Then click the squares to indicate their match status:</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>GREEN = the letter is correctly placed</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>YELLOW = the letter exists somewhere else in the word</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>GREY = the letter is not in the word</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>WHITE = no status (default)</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>As you type the box below will populate with words that match the pattern!</Typography>
          </Box>
        </Modal>
      </div>
    )
  }
}

export default App;
