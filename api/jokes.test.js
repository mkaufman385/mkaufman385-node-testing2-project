const request = require("supertest");
const db = require("../data/seeds/dbConfig");
const server = require("../server");

//DUMBY DATABASE JOKES
const joke1 = { joke: "Dumby Joke 1", punchline: "Dumby punchline 1" };
const joke2 = { joke: "Dumby Joke 2", punchline: "Dumby punchline 2" };

it("correct env var", () => {
  expect(process.env.DB_ENV).toBe("testing");
});
