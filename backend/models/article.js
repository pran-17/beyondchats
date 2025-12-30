import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,
    url: {
      type: String,
      unique: true,
    },
    fullContent: String,   
    publishedDate: Date,
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
