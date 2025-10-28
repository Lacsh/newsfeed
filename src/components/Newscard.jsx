import React from "react";

const Newscard = ({ article }) => {
  const { title, description, url, urlToImage, image } = article;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* 🖼️ Image */}
      <img
        src={urlToImage || image || "https://via.placeholder.com/300x200"}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* 📰 Content */}
      <div className="p-4 flex flex-col justify-between h-56">
        <div>
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {description || "No description available."}
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Read more →
        </a>
      </div>
    </div>
  );
};

export default Newscard;
