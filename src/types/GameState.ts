

type Move = {
    player: string;
    turn: number;
  }

export type GameState = {
    date: string;
    virtualBoard: Move [][];
    result: string;
}