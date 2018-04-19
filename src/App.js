import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const initialState = {
  board: [["", "", ""], ["", "", ""], ["", "", ""]],
  currentPlayer: "x",
  won: false,
  tie: false
};

class App extends Component {
  state = initialState;

  setValue(row, column, value) {
    const currentValue = this.board[row][column];
    if (!currentValue) {
      this.board[row][column] = value;
    }
  }

  squareComponent = (value, row, column) => {
    return (
      <div className="square" onClick={this.selectSquare(row, column)}>
        {value}
      </div>
    );
  };

  selectSquare = (row, column) => () => {
    if (!this.state.board[row][column] && !this.state.won) {
      const newState = [
        [...this.state.board[0]],
        [...this.state.board[1]],
        [...this.state.board[2]]
      ];
      newState[row][column] = this.state.currentPlayer;
      this.setState(
        {
          board: newState
        },
        this.afterSelect
      );
    }
  };

  afterSelect = () => {
    this.checkForWin();
    this.checkForTie();
    this.changePlayer();
  };

  checkForWin = () => {
    this.state.board.forEach(row => {
      this.checkSet(row);
    });
    for (let i = 0; i <= 2; i++) {
      const column = [
        this.state.board[0][i],
        this.state.board[1][i],
        this.state.board[2][i]
      ];
      console.log(column);
      this.checkSet(column);
    }
    this.checkSet([
      this.state.board[0][0],
      this.state.board[1][1],
      this.state.board[2][2]
    ]);
    this.checkSet([
      this.state.board[0][2],
      this.state.board[1][1],
      this.state.board[2][0]
    ]);
  };

  checkSet = row => {
    let empty = false;
    row.forEach(value => {
      if (value === "") {
        empty = true;
      }
    });
    if (!empty && row[0] === row[1] && row[1] === row[2]) {
      this.setState({
        won: true
      });
    }
  };

  checkForTie = () => {
    let empty = false;
    this.state.board.forEach(row =>
      row.forEach(value => {
        if (value === "") {
          empty = true;
        }
      })
    );
    if (!empty && !this.state.won) {
      this.setState({
        tie: true
      });
    }
  };

  changePlayer = () => {
    this.setState(prevState => {
      return {
        currentPlayer: prevState.currentPlayer === "x" ? "o" : "x"
      };
    });
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div className="App">
        {this.state.tie && "TIED"}
        {this.state.won && "YOU WON"}
        <div className="box-container">
          {this.state.board.map((row, rowIndex) => {
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {row.map((value, columnIndex) => {
                  return this.squareComponent(value, rowIndex, columnIndex);
                })}
              </div>
            );
          })}
        </div>
        {(this.state.won || this.state.tie) && (
          <button className="reset-button" onClick={this.reset}>
            Reset Game
          </button>
        )}
      </div>
    );
  }
}

export default App;
