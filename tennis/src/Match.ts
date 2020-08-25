import Player, { IPlayerState } from "./Player";
import { Mode } from "./constants";
import {
  isDeuce,
  isTiebreak,
  hasAdvantage,
  hasWonGame,
  hasWonMatch,
} from "./utils";

interface IMatchState {
  player1State?: IPlayerState;
  player2State?: IPlayerState;
  mode?: Mode;
  completed?: boolean;
}

type MatchSet = { [key: string]: Player };

class Match {
  private set: MatchSet;
  private _mode: Mode = Mode.NORMAL;
  private _completed: boolean = false;
  private _winner: string = null;

  get mode() {
    return this._mode;
  }

  get winner() {
    return this._winner;
  }

  get completed() {
    return this._completed;
  }

  constructor(player1: string, player2: string, state?: IMatchState) {
    this.set = {
      [player1]: new Player(player1, state?.player1State),
      [player2]: new Player(player2, state?.player2State),
    };
    this._mode = state?.mode ?? Mode.NORMAL;
    this._completed = state?.completed ?? false;
  }

  /**
   * Record player who won a point
   * @param  player name of player
   */
  pointWonBy(player: string) {
    // If the match has been won by someone, stop allowing this to
    if (this._completed) return;

    // Add point and recalculate state
    this.set[player].addPoint();
    this.afterAddPoint();
  }

  /**
   * Display current state of the match in string format. In the case of deuce,
   * instead of showing the points, it will show who has the advantage or when
   * it is currently in deuce.
   *
   * Note: in a tiebreaker situation, the normal scoring system is changed to
   * just showing the "raw" number of points (e.g. 1, 2, 3 vs 15, 30, 40).
   */
  score() {
    const [p1, p2] = Object.values(this.set);

    // If no points, just output the games
    const games = `${p1.games}-${p2.games}`;
    const isEmpty = p1.points === 0 && p2.points === 0;
    if (isEmpty) return games;

    // If there are points, then determine what to display as points
    let points = "";
    switch (this._mode) {
      case Mode.DEUCE: {
        const advantage = hasAdvantage(this._mode, p1, p2);
        points = advantage ? `Advantage ${advantage}` : "Deuce";
        break;
      }
      case Mode.TIEBREAK: {
        points = `${p1.points}-${p2.points}`;
        break;
      }
      default:
        points = `${p1.tennisPoints}-${p2.tennisPoints}`;
    }
    return `${games}, ${points}`;
  }

  /**
   * After adding a point to a player, calculate the match's next state. It does
   * the following:
   *
   * 1. Check if the game has been won by a player.
   *    1a. If not, then we check if it is in a deuce state. We terminate from
   *        here because the game is stil continuing.
   *
   * 2. If the game has been won by the player, add it to the winner's scoreboard
   *
   * 3. Check, by adding the game, that the overall match has been won.
   *    3a. If the match has been won, we mark match as completed and terminate
   *        from here since there is nothing to do.
   *
   * 4. If the match is still continuing, we check if there's a tiebreak match
   *    before resetting the points to signifiy a new game is to be played.
   */
  private afterAddPoint() {
    const [p1, p2] = Object.values(this.set);

    // Have they won a game?
    const wonGame = hasWonGame(this._mode, p1, p2);
    if (!wonGame) {
      if (isDeuce(this._mode, p1, p2)) this._mode = Mode.DEUCE;
      return;
    }
    this.set[wonGame.winner].addGame();
    const wonMatch = hasWonMatch(this._mode, p1, p2);
    if (wonMatch) {
      this._winner = wonMatch.winner;
      this._completed = true;
    } else {
      this._mode = isTiebreak(p1, p2) ? Mode.TIEBREAK : Mode.NORMAL;
    }
    p1.newGame();
    p2.newGame();
  }
}

export default Match;
