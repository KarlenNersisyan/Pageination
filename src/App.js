import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import "./App.css";
import Post from "./Post";

const url = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting posts");
      })
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            pageLimit={1}
            dataLimit={5}
          />
        </>
      ) : (
        <h1>No Posts to display</h1>
      )}
    </div>
  );
}
