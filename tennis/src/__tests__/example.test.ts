import Match from "../Match";
describe("Example scenario", () => {
  // Refer to https://github.com/DiUS/coding-tests/blob/master/dius_tennis.md
  it("as per specification", () => {
    const match = new Match("player 1", "player 2");
    match.pointWonBy("player 1");
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-0, 15-15");
    match.pointWonBy("player 1");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0, 40-15");
    match.pointWonBy("player 2");
    match.pointWonBy("player 2");
    expect(match.score()).toEqual("0-0, Deuce");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("0-0, Advantage player 1");
    match.pointWonBy("player 1");
    expect(match.score()).toEqual("1-0");
  });
});
