import {Move} from '../types';



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

  for(let [dr, dc] of directions) {
      let inARowPlayer = 0;
      let forkedSeq = 0;
      let r = row, c = col;

      while(r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player) {
          r += dr;
          c += dc;
          if (r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player){
            inARowPlayer++;
          }
      }

      r = row; c = col;

      while(r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player) {
        r -= dr;
        c -= dc;
        if (r < board.length && c < board[0].length && r >= 0 && c >= 0 && board[r][c]['player'] === player){
          forkedSeq++;
        }
    }

      scores.push(calcScore(player, inARowPlayer, forkedSeq))
  }
  let score = Math.max(...scores)
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
