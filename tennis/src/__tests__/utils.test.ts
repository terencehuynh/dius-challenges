import Player from "../Player";
import { Mode } from "../constants";

import {
  isDeuce,
  isTiebreak,
  hasAdvantage,
  hasWonGame,
  hasWonMatch,
} from "../utils";

describe("Utils", () => {
  describe("isDeuce", () => {
    it("handle successful case", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.NORMAL;
      expect(isDeuce(mode, p1, p2)).toBe(true);
    });
    it("handle successful case - advantage", () => {
      const p1 = new Player("Player 1", { points: 4 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.NORMAL;
      expect(isDeuce(mode, p1, p2)).toBe(true);
    });
    it("handle successful case - deuce after advantage", () => {
      const p1 = new Player("Player 1", { points: 4 });
      const p2 = new Player("Player 2", { points: 4 });
      const mode = Mode.NORMAL;
      expect(isDeuce(mode, p1, p2)).toBe(true);
    });
    it("handle failure case: not in deuce with player 1", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 2 });
      const mode = Mode.NORMAL;
      expect(isDeuce(mode, p1, p2)).toBe(false);
    });
    it("handle failure case: not in deuce with player 2", () => {
      const p1 = new Player("Player 1", { points: 2 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.NORMAL;
      expect(isDeuce(mode, p1, p2)).toBe(false);
    });
    it("handle failure case: mode is in tiebreak", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 2 });
      const mode = Mode.TIEBREAK;
      expect(isDeuce(mode, p1, p2)).toBe(false);
    });
  });

  describe("isTiebreak", () => {
    it("handles successful case", () => {
      const p1 = new Player("Player 1", { games: 6 });
      const p2 = new Player("Player 2", { games: 6 });
      expect(isTiebreak(p1, p2)).toBe(true);
    });
    it("handles failure case: close game", () => {
      const p1 = new Player("Player 1", { games: 6 });
      const p2 = new Player("Player 2", { games: 5 });
      expect(isTiebreak(p1, p2)).toBe(false);
    });
    it("handles failure case: no games", () => {
      const p1 = new Player("Player 1");
      const p2 = new Player("Player 2");
      expect(isTiebreak(p1, p2)).toBe(false);
    });
  });

  describe("hasAdvantage", () => {
    it("returns player 1 has advantage", () => {
      const p1 = new Player("Player 1", { points: 4 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.NORMAL;
      expect(hasAdvantage(mode, p1, p2)).toEqual(p1.name);
    });
    it("returns player 1 has advantage", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 4 });
      const mode = Mode.NORMAL;
      expect(hasAdvantage(mode, p1, p2)).toEqual(p2.name);
    });
    it("fails when there is no advantage (i.e. equal)", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.DEUCE;
      expect(hasAdvantage(mode, p1, p2)).toEqual(null);
    });
    it("fails on incorrect mode (mode NORMAL)", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.NORMAL;
      expect(hasAdvantage(mode, p1, p2)).toEqual(null);
    });
    it("fails on incorrect mode (mode TIEBREAK)", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.TIEBREAK;
      expect(hasAdvantage(mode, p1, p2)).toEqual(null);
    });
  });

  describe("hasWonGame", () => {
    it("normal game: player 1 has reached the game point", () => {
      const p1 = new Player("Player 1", { points: 4 });
      const p2 = new Player("Player 2", { points: 0 });
      const mode = Mode.NORMAL;
      expect(hasWonGame(mode, p1, p2)).toEqual({ winner: p1.name });
    });
    it("normal game: player 2 has reached the game point", () => {
      const p1 = new Player("Player 1", { points: 0 });
      const p2 = new Player("Player 2", { points: 4 });
      const mode = Mode.NORMAL;
      expect(hasWonGame(mode, p1, p2)).toEqual({ winner: p2.name });
    });
    it("normal game: player 2 has reached game point after previous", () => {
      const p1 = new Player("Player 1", { points: 2 });
      const p2 = new Player("Player 2", { points: 4 });
      const mode = Mode.NORMAL;
      expect(hasWonGame(mode, p1, p2)).toEqual({ winner: p2.name });
    });
    it("normal game: if given deuce state it should return false", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.NORMAL;
      expect(hasWonGame(mode, p1, p2)).toEqual(null);
    });
    it("normal game: if given deuce state with player advantage, it should return false", () => {
      const p1 = new Player("Player 1", { points: 4 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.NORMAL;
      expect(hasWonGame(mode, p1, p2)).toEqual(null);
    });
    it("deuce game: player 1 has won the game point", () => {
      const p1 = new Player("Player 1", { points: 5 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.DEUCE;
      expect(hasWonGame(mode, p1, p2)).toEqual({ winner: p1.name });
    });
    it("deuce game: player 2 has won the game point", () => {
      const p1 = new Player("Player 1", { points: 3 });
      const p2 = new Player("Player 2", { points: 5 });
      const mode = Mode.DEUCE;
      expect(hasWonGame(mode, p1, p2)).toEqual({ winner: p2.name });
    });
    it("deuce game: in deuce", () => {
      const p1 = new Player("Player 1", { points: 4 });
      const p2 = new Player("Player 2", { points: 4 });
      const mode = Mode.DEUCE;
      expect(hasWonGame(mode, p1, p2)).toEqual(null);
    });
    it("deuce game: player has advantage", () => {
      const p1 = new Player("Player 1", { points: 4 });
      const p2 = new Player("Player 2", { points: 3 });
      const mode = Mode.DEUCE;
      expect(hasWonGame(mode, p1, p2)).toEqual(null);
    });
    it("tiebreak: player 1 wins", () => {
      const p1 = new Player("Player 1", { points: 7 });
      const p2 = new Player("Player 2", { points: 5 });
      const mode = Mode.TIEBREAK;
      expect(hasWonGame(mode, p1, p2)).toEqual({ winner: p1.name });
    });
    it("tiebreak: player 2 wins", () => {
      const p1 = new Player("Player 1", { points: 7 });
      const p2 = new Player("Player 2", { points: 9 });
      const mode = Mode.TIEBREAK;
      expect(hasWonGame(mode, p1, p2)).toEqual({ winner: p2.name });
    });
    it("tiebreak: does not reach minimum points", () => {
      const p1 = new Player("Player 1", { points: 5 });
      const p2 = new Player("Player 2", { points: 5 });
      const mode = Mode.TIEBREAK;
      expect(hasWonGame(mode, p1, p2)).toEqual(null);
    });
    it("tiebreak: does not reach margin", () => {
      const p1 = new Player("Player 1", { points: 7 });
      const p2 = new Player("Player 2", { points: 6 });
      const mode = Mode.TIEBREAK;
      expect(hasWonGame(mode, p1, p2)).toEqual(null);
    });
  });

  describe("hasWonMatch", () => {
    it("return null if not minimum number", () => {
      const p1 = new Player("Player 1", { games: 0 });
      const p2 = new Player("Player 2", { games: 0 });
      const mode = Mode.NORMAL;
      expect(hasWonMatch(mode, p1, p2)).toEqual(null);
    });
    it("returns winning player when meeting win conditions (6-4)", () => {
      const p1 = new Player("Player 1", { games: 6 });
      const p2 = new Player("Player 2", { games: 4 });
      const mode = Mode.NORMAL;
      expect(hasWonMatch(mode, p1, p2)).toEqual({ winner: p1.name });
    });
    it("returns winning player when meeting win conditions (7-5)", () => {
      const p1 = new Player("Player 1", { games: 7 });
      const p2 = new Player("Player 2", { games: 5 });
      const mode = Mode.NORMAL;
      expect(hasWonMatch(mode, p1, p2)).toEqual({ winner: p1.name });
    });
    it("returns winning player when meeting win conditions (5-7)", () => {
      const p1 = new Player("Player 1", { games: 5 });
      const p2 = new Player("Player 2", { games: 7 });
      const mode = Mode.NORMAL;
      expect(hasWonMatch(mode, p1, p2)).toEqual({ winner: p2.name });
    });
    it("deuce doesn't make a difference to normal", () => {
      const p1 = new Player("Player 1", { games: 7 });
      const p2 = new Player("Player 2", { games: 5 });
      const mode = Mode.DEUCE;
      expect(hasWonMatch(mode, p1, p2)).toEqual({ winner: p1.name });
    });
    it("return null if tiebreaker", () => {
      const p1 = new Player("Player 1", { games: 6 });
      const p2 = new Player("Player 2", { games: 6 });
      const mode = Mode.NORMAL;
      expect(hasWonMatch(mode, p1, p2)).toEqual(null);
    });
    it("returns winning player when meeting win conditions (7-6, with tiebreak)", () => {
      const p1 = new Player("Player 1", { games: 7 });
      const p2 = new Player("Player 2", { games: 6 });
      const mode = Mode.TIEBREAK;
      expect(hasWonMatch(mode, p1, p2)).toEqual({ winner: p1.name });
    });
  });
});
