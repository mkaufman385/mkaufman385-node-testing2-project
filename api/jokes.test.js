const request = require("supertest");
const db = require("../data/seeds/dbConfig");
const server = require("../server");
const Joke = require("./jokesModel");

//DUMBY DATABASE JOKES
const joke1 = { joke: "Dumby Joke 1", punchline: "Dumby punchline 1" };
const joke2 = { joke: "Dumby Joke 2", punchline: "Dumby punchline 2" };

//
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("jokes").truncate();
});

afterAll(async () => {
  await db.destroy();
});

it("correct env var", () => {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("jokes model functions", () => {
  describe("creates joke", () => {
    it("adds a joke to the db", async () => {
      let jokes;
      await Joke.createJoke(joke1);
      jokes = await db("jokes");
      expect(jokes).toHaveLength(1);

      await Joke.createJoke(joke2);
      jokes = await db("jokes");
      expect(jokes).toHaveLength(2);
    });
    it("inserted joke and punchline", async () => {
      const joke = await Joke.createJoke(joke1);
      expect(joke).toMatchObject({ joke_id: 1, ...joke });
    });
  });
});
