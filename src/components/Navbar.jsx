import darkmode from "./Darkmode";

export default function Navbar({ category, setCategory, setQuery }) {
  return (
    <nav className="flex flex-wrap justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400">NewsFeed</h1>
      <div className="flex gap-4 items-center">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          <option value="general">General</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
        </select>
        <input
          type="text"
          placeholder="Search news..."
          onChange={(e) => setQuery(e.target.value)}
          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
        />
        <DarkModeToggle />
      </div>
    </nav>
  );
}
