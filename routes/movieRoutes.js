const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Create Movie (POST)
router.post("/", async (req, res) => {
  try {
    const { title, director, genre, releaseYear, availableCopies } = req.body;
    if (!title || !director || !genre || !releaseYear || !availableCopies) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMovie = new Movie({ title, director, genre, releaseYear, availableCopies });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get All Movies (GET)
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Movie by ID (GET)
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Movie (PUT)
router.put("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Movie (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
