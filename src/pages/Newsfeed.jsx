import { useEffect, useState } from "react";
import Newscard from "../components/Newscard";

export default function NewsFeed({ category, query }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  const fetchNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&q=${query}&page=${page}&pageSize=8&apiKey=YOUR_API_KEY`;
    const res = await fetch(url);
    const data = await res.json();
    setArticles((prev) => [...prev, ...data.articles]);
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
  }, [category, query]);

  useEffect(() => {
    fetchNews();
  }, [category, query, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {articles.map((a, i) => <NewsCard key={i} article={a} />)}
    </div>
  );
}
