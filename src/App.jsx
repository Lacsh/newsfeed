import { useEffect, useRef, useState } from "react";
import Newscard from "./components/Newscard";
import DarkModeToggle from "./components/DarkModeToggle";
import VisitorCounter from "./components/VisitorCounter";

export default function App() {
  // STATE VARIABLES
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  // API KEYS 
  const apiKey = "bcf5d948278041fba3612028ee65e1c4"; 
  const mapiKey = "bf6da2375ef887dd5b4a087f536019ff"; 
  const gapiKey = "b345a62f88aa9d3c3995097d0fe7616f"; 

  // FETCH NEWS 
  const fetchArticles = async (pageNum = 1, cat = category, keyword = search) => {
    setLoading(true);
    const urls = [
      `https://newsapi.org/v2/top-headlines?country=in&page=${pageNum}&category=${cat}&q=${keyword}&apiKey=${apiKey}`,
      `http://api.mediastack.com/v1/news?access_key=${mapiKey}&countries=in&limit=10&offset=${
        pageNum * 10
      }&categories=${cat}&keywords=${keyword}`,
      `https://gnews.io/api/v4/top-headlines?country=in&topic=${cat}&q=${keyword}&token=${gapiKey}`,
    ];

    for (let url of urls) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();

        let newArticles = [];
        if (data.articles?.length) newArticles = data.articles;
        else if (data.data?.length) newArticles = data.data;
        else continue;

      
        setArticles((prev) => [...prev, ...newArticles]);
        setLoading(false);
        return;
      } catch (err) {
        console.warn(`API failed: ${url}`, err);
      }
    }

    // Dummy 
    console.log(" APIs failed, using dummy data");
    const dummy = Array.from({ length: 10 }, (_, i) => ({
      title: `Sample News Title ${pageNum * 10 + i + 1}`,
      description:
        "This is dummy content for testing infinite scroll or when APIs are down.",
      urlToImage: "https://via.placeholder.com/300x200",
      url: "#",
    }));
    setArticles((prev) => [...prev, ...dummy]);
    setLoading(false);
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
      {/* Header + Dark Mode */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NewsFeed</h1>
        <DarkModeToggle />
      </div>
      
      {/* Global visitor counter */}
      <VisitorCounter />
    
      {/* Search Bar */}
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

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
            }}
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

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <Newscard key={index} article={article} />
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <p className="text-center mt-4 animate-pulse text-blue-400">
          Loading more news...
        </p>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={observerRef} className="h-10"></div>
    </div>
  );
}
