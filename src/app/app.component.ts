import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  turn: string = 'X';
  info: string = 'Turn for X';
  isGameOver: boolean = false;
  winnerImageWidth: string = '0px';
  lineTransform: string = '';
  lineWidth: string = '0vw';

  wins = [
    [0, 0, 0, 1, 0, 2, 5, 5, 0],
    [1, 0, 1, 1, 1, 2, 5, 15, 0],
    [2, 0, 2, 1, 2, 2, 5, 25, 0],
    [0, 0, 1, 0, 2, 0, -5, 15, 90],
    [0, 1, 1, 1, 2, 1, 5, 15, 90],
    [0, 2, 1, 2, 2, 2, 15, 15, 90],
    [0, 0, 1, 1, 2, 2, 5, 15, 45],
    [0, 2, 1, 1, 2, 0, 5, 15, 135],
  ];

  onBoxClick(row: number, col: number): void {
    if (this.isGameOver || this.board[row][col] !== '') return;

    this.board[row][col] = this.turn;
    this.turn = this.turn === 'X' ? 'O' : 'X';
    this.info = `Turn for ${this.turn}`;
    this.checkWin();
  }

  checkWin(): void {
    for (const win of this.wins) {
      const [x1, y1, x2, y2, x3, y3, translateX, translateY, rotate] = win;
      if (
        this.board[x1][y1] === this.board[x2][y2] &&
        this.board[x2][y2] === this.board[x3][y3] &&
        this.board[x1][y1] !== ''
      ) {
        this.info = `${this.board[x1][y1]} Won!`;
        this.isGameOver = true;
        this.winnerImageWidth = '200px';
        this.lineTransform = `translate(${translateX}vw, ${translateY}vw) rotate(${rotate}deg)`;
        this.lineWidth = '20vw';
        return;
      }
    }
  }

  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.turn = 'X';
    this.info = 'Turn for X';
    this.isGameOver = false;
    this.winnerImageWidth = '0px';
    this.lineTransform = '';
    this.lineWidth = '0vw';
  }
}
