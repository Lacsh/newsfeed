import React, { useEffect, useState } from "react";
import { db, ref, get, set } from "../firebase";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCountState] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      const countRef = ref(db, "visitorCount");
      const snapshot = await get(countRef);

      if (snapshot.exists()) {
        const newCount = snapshot.val() + 1;
        setVisitorCountState(newCount);
        await set(countRef, newCount);
      } else {
        // Initialize if first time
        await set(countRef, 1);
        setVisitorCountState(1);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="text-center my-6">
      {visitorCount ? (
        <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">
          You are the{" "}
          <span className="text-blue-600 dark:text-yellow-400 font-bold">
            {visitorCount}
          </span>{" "}
          person being updated with the latest global news! 
        </p>
      ) : (
        <p className="text-gray-500">Fetching visitor count...</p>
      )}
    </div>
  );
};

export default VisitorCounter;
