exports.seed = function (knex) {
  return knex("jokes")
    .truncate()
    .then(function () {
      return knex("jokes").insert([
        {
          joke: "1. Why did the chicken cross the road?",
          punchline: "1. To get to the other side",
        },
        {
          joke: "2. Why did the chicken cross the road?",
          punchline: "2. To get to the other side",
        },
        {
          joke: "3. Why did the chicken cross the road?",
          punchline: "3. To get to the other side",
        },
        {
          joke: "4. Why did the chicken cross the road?",
          punchline: "4. To get to the other side",
        },
        {
          joke: "5. Why did the chicken cross the road?",
          punchline: "5. To get to the other side",
        },
        {
          joke: "6. Why did the chicken cross the road?",
          punchline: "6. To get to the other side",
        },
      ]);
    });
};
