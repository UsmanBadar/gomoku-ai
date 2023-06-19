//import { checkGameStatus } from "./checkGameStatus";
import {Move} from '../types';
/*
function evaluate(board: Move[][], player: string): number {
  let score = 0;
  let height: number = board.length;
  let width: number = board[0].length;

  for(let row:number = 0; row < height; row++) {
    for (let col: number = 0; col < width; col++) {
        if(board[row][col]['player'] === 'white') score += 1;
        else if(board[row][col]['player'] === 'black') score -= 1;

        // Check for potential win and near win in all directions
        let directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
        for(let [dr, dc] of directions) {
            if(row + 4*dr < height && row + 4*dr >= 0 && col + 4*dc < width && col + 4*dc >= 0) {

              let tryingWinWhite = tryingWin(board, row, col, 'white', dr, dc);
              let tryingWinBlack = tryingWin(board, row, col, 'black', dr, dc);
              if(tryingWinWhite) score += 0;
              if(tryingWinBlack) score -= 10;

              let potentialWinWhite = potentialWin(board, row, col, 'white', dr, dc);
              let potentialWinBlack = potentialWin(board, row, col, 'black', dr, dc);
              if(potentialWinWhite) score += 0;
              if(potentialWinBlack) score -= 50;

              let nearWinWhite = nearWin(board, row, col, 'white', dr, dc);
              let nearWinBlack = nearWin(board, row, col, 'black', dr, dc);
              if(nearWinWhite) score += 0;
              if(nearWinBlack) score -= 100;

              let certainWinWhite = certainWin(board, row, col, 'white', dr, dc);
              let certainWinBlack = certainWin(board, row, col, 'black', dr, dc);
              if(certainWinWhite) score += 0;
              if(certainWinBlack) score -= 200;
            }
        }
    }
  }

  return score;
}


function tryingWin(board: Move[][], row: number, col: number, player: string, dr: number, dc: number): boolean {
  let count = 0;
  for(let i = 0; i < 5; i++) {
    if(board[row + i * dr][col + i * dc]['player'] === opponent(player)) return false;
    if(board[row + i * dr][col + i * dc]['player'] === player) count += 1;
  }
  return count === 1;
}

function potentialWin(board: Move[][], row: number, col: number, player: string, dr: number, dc: number): boolean {
  let count = 0;
  for(let i = 0; i < 5; i++) {
    if(board[row + i * dr][col + i * dc]['player'] === opponent(player)) return false;
    if(board[row + i * dr][col + i * dc]['player'] === player) count += 1;
  }
  return count >= 2;
}


function nearWin(board: Move[][], row: number, col: number, player: string, dr: number, dc: number): boolean {
  let count = 0;
  for(let i = 0; i < 5; i++) {
      if(board[row + i * dr][col + i * dc]['player'] === player) count += 1;
  }
  return count >= 3;
}

function certainWin(board: Move[][], row: number, col: number, player: string, dr: number, dc: number): boolean {
  let count = 0;
  for(let i = 0; i < 5; i++) {
      if(board[row + i * dr][col + i * dc]['player'] === player) count += 1;
  }
  return count === 4;
}


function opponent(player: string): string {
  return player === 'white' ? 'black' : 'white';
}



function evaluateSpotAdvanced(board: Move[][], row: number, col: number, player: string) {
  let score = 0;
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]]; // right, down, diag_down_right, diag_down_left
  //const opponent = player === 'white' ? 'black' : 'white';

  for(let [dr, dc] of directions) {
      let inARowPlayer = 0;
      //let inARowOpponent = 0;
      let r = row, c = col;

      while(r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player) {
          inARowPlayer++;
          r += dr;
          c += dc;
      }
/*
      r = row; c = col;
      while(r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === opponent) {
          inARowOpponent++;
          r += dr;
          c += dc;
      }

      if (inARowPlayer >= 3 && player === 'black'){
        score += inARowPlayer * 5
      }else if(inARowPlayer === 4 && player === 'white'){
        score += inARowPlayer * 10
      }else if (inARowPlayer === 2 && player === 'black'){
        score += inARowPlayer * 3;
      }else{
        score += inARowPlayer;
      }
  }

  return score;
}

function heuristicEvaluationAdvanced(board: Move[][]) {
  let playerScore = 0;
  let aiScore = 0;

  // Analyze the board
  for(let row = 0; row < board.length; row++) {
      for(let col = 0; col < board[row].length; col++) {
          if(board[row][col]['player'] === 'white') {
              // If there is a AI's piece at this spot, increase its score
              aiScore += evaluateSpotAdvanced(board, row, col, 'white');
          }
          else if(board[row][col]['player'] === 'black') {
              // If there is a player's piece at this spot, increase its score
              playerScore += evaluateSpotAdvanced(board, row, col, 'black');
          }
      }
  }

  // Subtract the player's score from the AI's score and return it
  return aiScore - playerScore;
}





function minimax(board: Move[][], depth:number, isMaximizingPlayer: Boolean, alpha: number, beta: number) {
  if(depth === 0) {
      // Use the new evaluate function to get a score for the current board state
      let score = heuristicEvaluationAdvanced(board);
      return { score, row: -1, col: -1 };
  }

  let bestMove = { score: isMaximizingPlayer ? -Infinity : Infinity, row: -1, col: -1 };

  for(let row = 0; row < board.length; row++) {
      for(let col = 0; col < board[row].length; col++) {
          if(board[row][col].player === '') {
              board[row][col].player = isMaximizingPlayer ? 'white' : 'black';

              let currentMove = minimax(board, depth - 1, !isMaximizingPlayer, alpha, beta);

              board[row][col].player = '';

              if(isMaximizingPlayer && currentMove.score > bestMove.score) {
                  bestMove = currentMove;
                  bestMove.row = row;
                  bestMove.col = col;
                  alpha = Math.max(alpha, bestMove.score);
              } else if(!isMaximizingPlayer && currentMove.score < bestMove.score) {
                  bestMove = currentMove;
                  bestMove.row = row;
                  bestMove.col = col;
                  beta = Math.min(beta, bestMove.score);
              }

              if(beta <= alpha) break;
          }
      }
  }

  return bestMove;
}

export function aiMove(board: Move[][]) {
  if (board.every(row => row.every(cell => cell.player === ''))) {
    // If it is, return the coordinates of the middle of the board
    return { row: Math.floor(board.length / 2), col: Math.floor(board[0].length / 2) };
  }
  let { row, col } = minimax(board, 2, true, -Infinity, Infinity);
  return { row, col };
}
*/



/*
export function aiMove(board: Move[][]) {
  // Check if the board is empty (i.e., it's the first move)
  if (board.every(row => row.every(cell => cell.player === ''))) {
    // If it is, return the coordinates of the middle of the board
    return { row: Math.floor(board.length / 2), col: Math.floor(board[0].length / 2) };
  }

  let bestScore = -Infinity;
  let bestMove = null;

  for(let row = 0; row < board.length; row++) {
    for(let col = 0; col < board[row].length; col++) {
      if(board[row][col].player === '') {
        board[row][col].player = 'white';  // Try the move
        let score = heuristicEvaluation(board);  // Evaluate the new board state
        board[row][col].player = '';  // Undo the move

        if(score > bestScore) {  // If the move is better than the current best
          bestScore = score;
          bestMove = { row, col };
        }
      }
    }
  }

  return bestMove;
}
*/


function calcScore(player: string, seq: number, forkedSeq: number){
  let multiplier: number = 0;
  let score = 0;
  let bonus = 0;
  if (forkedSeq > 0){
    bonus = forkedSeq * 2;
  }
  if(player === 'white'){
    multiplier = seq;
  }else if(player === 'black'){
    multiplier = seq + 2;
  }
  
  if(seq === 4){
      score = seq * multiplier;
    }else if(seq === 3){
      score = seq * multiplier;
    }else if(seq === 2){
      score = seq * multiplier;
    }else if (seq === 1){
      score = seq;
    }else{
      score = 0 
    }
    return score + bonus;
}


function evaluateSpotAdvanced(board: Move[][], row: number, col: number, player: string) {
  let scores = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
 // right, down, diag_down_right, diag_down_left
  //const opponent = player === 'white' ? 'black' : 'white';

  for(let [dr, dc] of directions) {
      let inARowPlayer = 0;
      let forkedSeq = 0;
      //let inARowOpponent = 0;
      let r = row, c = col;

      while(r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player) {
          //inARowPlayer++;
          r += dr;
          c += dc;
          if (r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player){
            inARowPlayer++;
          }
      }

      r = row; c = col;

      while(r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player) {
        //inARowPlayer++;
        r -= dr;
        c -= dc;
        if (r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player){
          forkedSeq++;
        }
    }

      scores.push(calcScore(player, inARowPlayer, forkedSeq))
  }
  console.log(scores);
  let score = Math.max(...scores)
  console.log(score);
  return score;
}


function heuristicEvaluationAdvanced(board: Move[][]) {
  let scores = [];

  for(let row = 0; row < board.length; row++) {
      let rowScores = [];
      for(let col = 0; col < board[row].length; col++) {
          if(board[row][col]['player'] === '') {
              board[row][col]['player'] = 'white';
              let whiteScore: number = evaluateSpotAdvanced(board, row, col, 'white');
              board[row][col]['player'] = 'black';
              let blackScore: number = evaluateSpotAdvanced(board, row, col, 'black');
              board[row][col]['player'] = '';
              rowScores.push(Math.max(whiteScore, blackScore));
          } else {
              rowScores.push(-1);
          }
      }
      scores.push(rowScores);
  }
  console.log(scores);
  return scores;
}

function minimax(board: Move[][], depth:number, isMaximizingPlayer: Boolean, alpha: number, beta: number) {
  let scores = heuristicEvaluationAdvanced(board);
  let maxScore = -Infinity;
  let bestMove = { score: maxScore, row: -1, col: -1 };

  for(let row = 0; row < scores.length; row++) {
      for(let col = 0; col < scores[row].length; col++) {
          if(scores[row][col] > maxScore) {
              maxScore = scores[row][col];
              bestMove = { score: maxScore, row, col };
          }
      }
  }

  return bestMove;
}

export function aiMove(board: Move[][]) {
  if (board.every(row => row.every(cell => cell.player === ''))) {
    return { row: Math.floor(board.length / 2), col: Math.floor(board[0].length / 2) };
  }
  let { row, col } = minimax(board, 2, true, -Infinity, Infinity);
  return { row,col };
}
