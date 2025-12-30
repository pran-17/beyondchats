import { useEffect, useState } from "react";
import axios from "axios";

function ScrapeBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/articles")
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Oldest Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <a href={blog.url} target="_blank">{blog.url}</a>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ScrapeBlogs;
