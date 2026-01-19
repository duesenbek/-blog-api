const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
    const { title, body, author } = req.body;
    if (!title || !body)
        return res.status(400).json({ message: "Title and body required" });

    try {
        const blog = await Blog.create({ title, body, author });
        res.status(201).json(blog);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

//READ ALL
router.get("/", async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

//READ ONE
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Not found" });
        res.json(blog);
    } catch {
        res.status(400).json({ message: "Invalid ID" });
    }
});

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!blog) return res.status(404).json({ message: "Not found" });
        res.json(blog);
    } catch {
        res.status(400).json({ message: "Invalid ID" });
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch {
        res.status(400).json({ message: "Invalid ID" });
    }
});

module.exports = router;
