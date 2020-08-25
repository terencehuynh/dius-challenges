import Match from "../Match";
import { Mode } from "../constants";

describe("Match class", () => {
  it("generate a new match", () => {
    const match = new Match("player 1", "player 2");
    expect(match.score()).toEqual("0-0");
    expect(match.mode).toEqual(Mode.NORMAL);
    expect(match.winner).toEqual(null);
    expect(match.completed).toEqual(false);
  });

  it("displays points", () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0, 15-0");
  });

  it("displays the correct point mapping", () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0, 15-0");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0, 30-0");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0, 40-0");
  });

  it("displays games", () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("1-0");
    expect(match.winner).toEqual(null);
    expect(match.completed).toEqual(false);
  });

  it("displays match and games", () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("1-0, 0-15");
  });

  it("wins match from normal", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { games: 5, points: 3 },
      player2State: { games: 4, points: 2 },
    });
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("6-4");
    expect(match.winner).toEqual("player 1");
    expect(match.completed).toEqual(true);
  });

  it("goes to deuce", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { points: 3 },
      player2State: { points: 2 },
    });
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-0, Deuce");
    expect(match.mode).toEqual(Mode.DEUCE);
  });

  it("goes to deuce, advantage and wins point", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { points: 3 },
      player2State: { points: 2 },
    });
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-0, Deuce");
    expect(match.mode).toEqual(Mode.DEUCE);
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-0, Advantage player 2");
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-1");
    expect(match.mode).toEqual(Mode.NORMAL);
    expect(match.winner).toEqual(null);
    expect(match.completed).toEqual(false);
  });

  it("goes to deuce, advantage and goes back to deuce again", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { points: 3 },
      player2State: { points: 2 },
    });
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-0, Deuce");
    expect(match.mode).toEqual(Mode.DEUCE);
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-0, Advantage player 2");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0, Deuce");
    expect(match.mode).toEqual(Mode.DEUCE);
    expect(match.winner).toEqual(null);
    expect(match.completed).toEqual(false);
  });

  it("wins match from tiebreaker", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { games: 6, points: 3 },
      player2State: { games: 5, points: 3 },
      mode: Mode.DEUCE,
    });
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("6-5, Advantage player 1");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("7-5");
    expect(match.winner).toEqual("player 1");
    expect(match.completed).toEqual(true);
  });

  it("goes to tiebreaker", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { games: 6, points: 2 },
      player2State: { games: 5, points: 3 },
    });
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("6-6");
    expect(match.mode).toEqual(Mode.TIEBREAK);
    expect(match.winner).toEqual(null);
    expect(match.completed).toEqual(false);
  });

  it("goes to tiebreaker, wins point", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { games: 6, points: 2 },
      player2State: { games: 5, points: 3 },
    });
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("6-6, 0-1");
    expect(match.mode).toEqual(Mode.TIEBREAK);
    expect(match.winner).toEqual(null);
    expect(match.completed).toEqual(false);
  });

  it("wins match from tiebreaker", () => {
    const match = new Match("player 1", "player 2", {
      player1State: { games: 6, points: 7 },
      player2State: { games: 6, points: 6 },
      mode: Mode.TIEBREAK,
    });
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("7-6");
    expect(match.winner).toEqual("player 1");
    expect(match.completed).toEqual(true);
  });

  it("if completed, you cannot add a new point", () => {
    const match = new Match("player 1", "player 2", {
      completed: true,
    });
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0");
    expect(match.completed).toEqual(true);
  });
});
