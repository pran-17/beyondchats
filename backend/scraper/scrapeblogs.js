import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeOldestBlogs() {
  const mainPage = await axios.get("https://beyondchats.com/blogs/");
  const $ = cheerio.load(mainPage.data);

  const lastPageUrl = $(".pagination a").last().attr("href");

  const lastPage = await axios.get(lastPageUrl);
  const $$ = cheerio.load(lastPage.data);

  const articles = [];

  $$("article").each((i, el) => {
    if (articles.length < 5) {
      articles.push({
        title: $$(el).find("h2 a").text().trim(),
        url: $$(el).find("h2 a").attr("href"),
        content: $$(el).find("p").text().trim(),
        publishedDate: $$(el).find("time").attr("datetime"),
      });
    }
  });

  return articles;
}
