import { useEffect, useRef, useState } from "react";
import Newscard from "./components/Newscard";
import DarkModeToggle from "./components/DarkModeToggle";
import VisitorCounter from "./components/VisitorCounter";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();


  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const mapiKey = process.env.REACT_APP_MEDIASTACK_KEY;
  const gapiKey = process.env.REACT_APP_GNEWS_API_KEY;

  
const fetchArticles = async (pageNum = 1, cat = category, keyword = search) => {
  setLoading(true);
  try {
    const urls = [
      `https://newsapi.org/v2/top-headlines?country=in&page=${pageNum}&category=${cat}&q=${keyword}&apiKey=${apiKey}`,
      `https://api.mediastack.com/v1/news?access_key=${mapiKey}&countries=in&limit=10&offset=${pageNum * 10}&categories=${cat}&keywords=${keyword}`,
      `https://gnews.io/api/v4/top-headlines?country=in&topic=${cat}&q=${keyword}&token=${gapiKey}`
    ];

    const responses = await Promise.allSettled(urls.map((u) => fetch(u)));
    const jsonResults = await Promise.all(
      responses
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value.json())
    );

    
    const validResults = jsonResults.filter(
      (res) =>
        res &&
        (res.articles?.length > 0 ||
         res.data?.length > 0 ||
         res.news?.length > 0)
    );

    if (validResults.length === 0) {
      console.warn("No valid data returned — possibly rate-limited or quota reached.");
      setHasMore(false);
      setError("⚠️ You've reached today's API limit or no news available right now.");
      return;
    }

    
    const articles = validResults.flatMap((res) => {
      const arr = res.articles || res.data || res.news || [];
      return arr.map((a) => ({
        title: a.title,
        description: a.description || a.content,
        url: a.url,
        image:
          a.urlToImage && a.urlToImage.startsWith("http")
            ? a.urlToImage
            : a.image && a.image.startsWith("http")
            ? a.image
            : null,
        source: a.source?.name || a.source || "Unknown",
      }));
    });

    if (articles.length === 0) {
      setHasMore(false);
      setError("⚠️ No articles found or API limit reached.");
    } else {
      
      setArticles((prev) => [...prev, ...articles]);
      setHasMore(true);
      setError(null);
    }
  } catch (err) {
    console.error("Error fetching articles:", err);
    setError("❌ Failed to fetch news. Check your connection or API limits.");
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    setPage(1);
    setArticles([]);
    fetchArticles(1, category, search);
  }, [category]);

  useEffect(() => {
    fetchArticles(page, category, search);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading]);

  const filteredArticles = articles.filter((a) =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [
    "general",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NewsFeed</h1>
        <DarkModeToggle />
      </div>

      <VisitorCounter />

      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
          setArticles([]);
          fetchArticles(1, category, e.target.value);
        }}
        className="w-full max-w-lg mb-6 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              category === cat
                ? "bg-blue-600 text-white dark:bg-blue-500 scale-105"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <Newscard key={index} article={article} />
        ))}
      </div>

      {loading && (
        <p className="text-center mt-4 animate-pulse text-blue-400">
          Loading more news...
        </p>
      )}
      {error && (
  <p className="text-center mt-4 text-red-400">
    {error}
  </p>
)}

{!hasMore && !loading && (
  <p className="text-center mt-4 text-gray-400">
     No more news to load.
  </p>
)}

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
}
