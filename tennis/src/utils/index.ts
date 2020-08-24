import Player from "../Player";
import { Mode, TIEBREAK_MIN_POINTS, MIN_GAMES } from "../constants";

export const isDeuce = (mode: Mode, p1: Player, p2: Player) => {
  return mode !== Mode.TIEBREAK && p1.points >= 3 && p2.points >= 3;
};

export const isTiebreak = (p1: Player, p2: Player) => {
  return p1.games === 6 && p2.games === 6;
};

export const hasAdvantage = (mode: Mode, p1: Player, p2: Player) => {
  const difference = p1.points - p2.points;
  if (!isDeuce(mode, p1, p2) || difference === 0) return null;
  return difference > 0 ? p1.name : p2.name;
};

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

export const hasWonMatch = (p1: Player, p2: Player) => {
  // Check if they reach the minimum number of games
  if (p1.games < MIN_GAMES && p2.games < MIN_GAMES) return null;

  // Must have a margin of two games before match is won
  const diff = p1.games - p2.games;
  if (diff > 1) return { winner: p1.name };
  if (diff < -1) return { winner: p2.name };
  return null;
};
