import React from "react";

const Newscard = ({ article }) => {
  const { title, description, url, urlToImage, image } = article;

  return (
   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
 <img
  src={
    article.urlToImage ||
    article.image ||
    "https://via.placeholder.com/400x200?text=No+Image"
  }
  alt={article.title || "News image"}
  className="w-full h-48 object-cover rounded"
  onError={(e) => {
    // Prevent infinite loop
    if (!e.target.dataset.fallback) {
      e.target.dataset.fallback = true;
      e.target.src = "https://via.placeholder.com/400x200?text=Image+Unavailable";
    }
  }}
/>


  <div className="p-4">
    <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
      {article.description}
    </p>
    <p className="text-xs text-blue-500 mb-2">
      Source: {article.sourceName || article.source?.name || "Unknown"}
    </p>
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
    >
      Read More →
    </a>
  </div>
</div>

  );
};

export default Newscard;
