import Player from "../Player";

describe("Player tests", () => {
  describe("Constructor", () => {
    it("create empty object", () => {
      const player = new Player("name");
      expect(player.name).toEqual("name");
      expect(player.points).toEqual(0);
      expect(player.tennisPoints).toEqual("0");
      expect(player.games).toEqual(0);
    });

    it("pass state", () => {
      const player = new Player("name", { games: 1, points: 3 });
      expect(player.name).toEqual("name");
      expect(player.points).toEqual(3);
      expect(player.tennisPoints).toEqual("40");
      expect(player.games).toEqual(1);
    });
  });

  describe("Tennis Points", () => {
    it("maps correctly to the points", () => {
      const player = new Player("name");
      expect(player.points).toEqual(0);
      expect(player.tennisPoints).toEqual("0");
      player.addPoint();
      expect(player.points).toEqual(1);
      expect(player.tennisPoints).toEqual("15");
      player.addPoint();
      expect(player.points).toEqual(2);
      expect(player.tennisPoints).toEqual("30");
      player.addPoint();
      expect(player.points).toEqual(3);
      expect(player.tennisPoints).toEqual("40");
    });
    it("wraps around again to avoid array index errors", () => {
      const player = new Player("name", { games: 1, points: 3 });
      expect(player.points).toEqual(3);
      expect(player.tennisPoints).toEqual("40");
      player.addPoint();
      expect(player.points).toEqual(4);
      expect(player.tennisPoints).toEqual("0");
    });
  });

  describe("Helper functions", () => {
    it("add points", () => {
      const player = new Player("name");
      expect(player.points).toEqual(0);
      player.addPoint();
      expect(player.points).toEqual(1);
    });

    it("add game", () => {
      const player = new Player("name");
      expect(player.games).toEqual(0);
      player.addGame();
      expect(player.games).toEqual(1);
    });

    it("reset points on new game called", () => {
      const player = new Player("name", { games: 1, points: 3 });
      expect(player.games).toEqual(1);
      expect(player.points).toEqual(3);
      player.newGame();
      expect(player.games).toEqual(1);
      expect(player.points).toEqual(0);
    });

    it("reset everything", () => {
      const player = new Player("name", { games: 1, points: 3 });
      expect(player.games).toEqual(1);
      expect(player.points).toEqual(3);
      player.reset();
      expect(player.games).toEqual(0);
      expect(player.points).toEqual(0);
    });
  });
});
