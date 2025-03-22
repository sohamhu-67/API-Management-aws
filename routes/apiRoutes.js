const express = require("express");
const router = express.Router();
const API = require("../models/apiModel");

// Home Page - Form to Add API
router.get("/", (req, res) => {
  res.render("index");
});

// Store API - Save API details to MongoDB
router.post("/store-api", async (req, res) => {
  try {
    const { name, endpoint, method, description } = req.body;
    const newAPI = new API({ name, endpoint, method, description });
    await newAPI.save();
    res.redirect("/stored-api");
  } catch (error) {
    res.status(500).send("Error saving API");
  }
});

// View All Stored APIs
router.get("/stored-api", async (req, res) => {
  try {
    const apis = await API.find();
    res.render("stored-api", { apis });
  } catch (error) {
    res.status(500).send("Error fetching APIs");
  }
});

// View Individual API
router.get("/api/:id", async (req, res) => {
  try {
    const api = await API.findById(req.params.id);
    if (!api) return res.status(404).send("API not found");
    res.render("api-doc", { api });
  } catch (error) {
    res.status(500).send("Error fetching API details");
  }
});

// Delete API
router.post("/delete-api/:id", async (req, res) => {
  try {
    await API.findByIdAndDelete(req.params.id);
    res.redirect("/stored-api");
  } catch (error) {
    res.status(500).send("Error deleting API");
  }
});

module.exports = router;
