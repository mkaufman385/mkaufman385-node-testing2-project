const express = require("express");
const router = express.Router();
const Joke = require("./jokesModel");

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const delJoke = await Joke.deleteJoke(id);
  console.log(delJoke);
  res.status(200).json(delJoke);
});

module.exports = router;
