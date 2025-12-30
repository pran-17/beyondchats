import express from "express";
import Article from "../models/article.js";
import { scrapeOldestBlogs } from "../scraper/scrapeblogs.js";

const router = express.Router();

/* -------------------- CREATE (SCRAPE & SAVE) -------------------- */
router.post("/scrape", async (req, res) => {
  try {
    const scrapedArticles = await scrapeOldestBlogs();
    const savedArticles = [];

    for (const article of scrapedArticles) {
      const exists = await Article.findOne({ url: article.url });
      if (!exists) {
        const newArticle = await Article.create(article);
        savedArticles.push(newArticle);
      }
    }

    res.status(201).json({
      message: "Articles scraped and saved successfully",
      count: savedArticles.length,
      data: savedArticles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- READ ALL ARTICLES -------------------- */
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedDate: 1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- READ SINGLE ARTICLE -------------------- */
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- UPDATE ARTICLE -------------------- */
router.put("/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* -------------------- DELETE ARTICLE -------------------- */
router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
