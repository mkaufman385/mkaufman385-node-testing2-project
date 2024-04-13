const request = require("supertest");
const db = require("../data/seeds/dbConfig");
const server = require("../server");
const Joke = require("./jokesModel");

beforeAll(async () => {
  // Clear migration lock
  await db("knex_migrations_lock").update({ is_locked: 0 });
  await db.migrate.rollback();
  await db.migrate.latest();
});

// const knexCleaner = require("knex-cleaner");

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });

// beforeEach(async () => {
//   await knexCleaner.clean(db, {
//     mode: "delete", // 'delete' can be used if truncating isn't supported
//     ignoreTables: ["knex_migrations", "knex_migrations_lock"],
//   });
// });

// afterAll(async () => {
//   await db.destroy();
// });

//DUMBY DATABASE JOKES
const joke1 = { joke: "Dumby Joke 1", punchline: "Dumby punchline 1" };
const joke2 = { joke: "Dumby Joke 2", punchline: "Dumby punchline 2" };

// beforeAll(async () => {
//   await db.migrate.rollback();
//   await db.migrate.latest();
// });

// beforeEach(async () => {
//   await db("jokes").truncate();
// });

// afterAll(async () => {
//   await db.destroy();
// });

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
  describe("[DELETE] / - deletes joke", () => {
    it("removes joke from db", async () => {
      const [joke_id] = await db("jokes").insert(joke1);
      let joke = await db("jokes").where({ joke_id }).first();
      // Verify that the joke exists in the database before deletion
      expect(joke).toBeTruthy();
      // Send DELETE request to delete the joke
      await request(server).delete("/jokes/" + joke_id);
      // Check if the joke no longer exists in the database
      joke = await db("jokes").where({ joke_id }).first();
      expect(joke).toBeFalsy();
    });
    it("responds with the deleted joke", async () => {
      await db("jokes").insert(joke1);
      let joke = await request(server).delete("/jokes/1");
      expect(joke.body).toMatchObject(joke1);
    });
  });
});
