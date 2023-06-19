

type Move = {
    player: string;
    turn: number;
    score: number;
  }

export type GameState = {
    date: string;
    virtualBoard: Move [][];
    result: string;
}