import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/articles");
        setArticles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <h2>Loading articles...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>BeyondChats – Oldest Articles</h1>

      {articles.length === 0 && <p>No articles found</p>}

     {articles.map((article) => (
  <div className="article-card" key={article._id}>
    <h3>{article.title}</h3>

    <p>{article.content}</p>

    <p className="article-date">
      Published:{" "}
      {article.publishedDate
        ? new Date(article.publishedDate).toDateString()
        : "N/A"}
    </p>

    <a href={article.url} target="_blank" rel="noreferrer">
      Read full article →
    </a>
  </div>
))}

    </div>
  );
}

export default App;
