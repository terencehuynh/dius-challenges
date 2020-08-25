import Player from "./Player";
import { Mode, TIEBREAK_MIN_POINTS, MIN_GAMES } from "./constants";

/**
 * Calculate if a deuce situation occurs between two players. This
 * only occurs when both players are 40-40 (or greater, see README.md)
 *
 * @param  mode (Mode)    enum value if the game is normal, deuce or tiebreak
 * @param  p1   (Player)  player one
 * @param  p2   (Player)  player two
 * @return true if it is a deuce, false if not
 */
export const isDeuce = (mode: Mode, p1: Player, p2: Player) => {
  return mode !== Mode.TIEBREAK && p1.points >= 3 && p2.points >= 3;
};

/**
 * Calculate if two players are in a tiebreak situation. This occurs when both
 * players reach 6-6 (this exact situation)
 *
 * @param  p1   (Player)  player one
 * @param  p2   (Player)  player two
 * @return true if it is a tiebreak, false if not
 */
export const isTiebreak = (p1: Player, p2: Player) => {
  return p1.games === 6 && p2.games === 6;
};

/**
 * Calculate which player has an advantage. A player has an advantage if they
 * have at least one more point than the other player in deuce. Used only for
 * the outputting of scores.
 *
 * It must also satisify the isDeuce condition (i.e, that it's 40-40 or greater)
 *
 * @param  mode (Mode)    enum value if the game is normal, deuce or tiebreak
 * @param  p1   (Player)  player one
 * @param  p2   (Player)  player two
 * @return
 */
export const hasAdvantage = (mode: Mode, p1: Player, p2: Player) => {
  const difference = p1.points - p2.points;
  if (!isDeuce(mode, p1, p2) || difference === 0) return null;
  return difference > 0 ? p1.name : p2.name;
};

/**
 * Determine which player has won the game point. These are the ways a player
 * can win a game.
 *
 * - When mode is NORMAL, the player must get 4 points _and_ the other player
 *   must not get at least 3 points (otherwise, that forces a deuce)
 * - When mode is DEUCE, the player must get two points more than their opponent
 *   (this is because an advantage is one point, to win the game from an
 *   advantage is another point).
 * - When mode is TIEBREAK, the player must get to the minimum number of points
 *   AND must have a margin of 2 points between them and their opponent.
 *
 * @param  mode (Mode)    enum value if the game is normal, deuce or tiebreak
 * @param  p1   (Player)  player one
 * @param  p2   (Player)  player two
 * @return an object with the player's name as the winner, or null
 */
export const hasWonGame = (mode: Mode, p1: Player, p2: Player) => {
  switch (mode) {
    case Mode.TIEBREAK: {
      if (p1.points < TIEBREAK_MIN_POINTS && p2.points < TIEBREAK_MIN_POINTS)
        return null;
      // If does reach tiebreak minimum, process points similar to DEUCE mode
      // (i.e. needs to have a margin of two points between them)
    }
    case Mode.DEUCE: {
      // Calculate the difference. For a player to have been "won" in a deuce,
      // the margin of points must be two (advantage + winning point).
      const diff = p1.points - p2.points;
      if (diff > 1) return { winner: p1.name };
      if (diff < -1) return { winner: p2.name };
      return null;
    }
    case Mode.NORMAL: {
      if (p1.points > 3 && p2.points < 3) return { winner: p1.name };
      if (p2.points > 3 && p1.points < 3) return { winner: p2.name };
      return null;
    }
  }
};

/**
 * Determines when the player has won the match. This assumes a standard male
 * singles match.
 *
 * To win a match, a player must win the minimum number of game points (5) and
 * needs a margin of two game points between them and the player to win.
 *
 * @param  p1   (Player)  player one
 * @param  p2   (Player)  player two
 * @return an object with the player's name as the winner, or null
 */
export const hasWonMatch = (p1: Player, p2: Player) => {
  // Check if they reach the minimum number of games
  if (p1.games < MIN_GAMES && p2.games < MIN_GAMES) return null;

  // Must have a margin of two games before match is won
  const diff = p1.games - p2.games;
  if (diff > 1) return { winner: p1.name };
  if (diff < -1) return { winner: p2.name };
  return null;
};
