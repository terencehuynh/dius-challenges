const TennisPoints = ["0", "15", "30", "40"];

export interface IPlayerState {
  games?: number;
  points?: number;
}

class Player {
  private _name: string;
  private _games: number;
  private _points: number;

  constructor(name: string, { games = 0, points = 0 }: IPlayerState = {}) {
    this._name = name;
    this._games = games;
    this._points = points;
  }

  get name() {
    return this._name;
  }

  get points() {
    return this._points;
  }

  get tennisPoints() {
    return TennisPoints[this._points % 4];
  }

  get games() {
    return this._games;
  }

  addPoint(): void {
    this._points++;
  }

  addGame(): void {
    this._games++;
  }

  newGame(): void {
    this._points = 0;
  }

  reset(): void {
    this._games = 0;
    this._points = 0;
  }
}

export default Player;
