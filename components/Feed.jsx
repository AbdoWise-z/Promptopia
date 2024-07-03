"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return ( 
    <div className="mt-16 prompt_layout w-full">
      {
        data.map((post) => (
          <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => {handleTagClick && handleTagClick(post.tag)}}
          />
        ))
      }
    </div> 
  );
}
 
const Feed = () => {
  const [LoadedPrompts, setLoadedPrompts] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [IsSearching, setIsSearching] = useState(false);

  const [Target, setTarget] = useState("");
  const [NextTarget, setNextTarget] = useState(null);
  
  if (!IsSearching && NextTarget != null && NextTarget != Target){
    const nt = NextTarget;
    setNextTarget(null);
    setTarget(nt);
  }

  useEffect(() => {
    const fetchPrmopts = async () => {
      try{
        const res = await fetch("/api/prompt/" , {
          method: "POST",
          body: JSON.stringify({
            "filter": Target
          })
        });
        if (res.ok){
          const data = await res.json();
          setLoadedPrompts(data);
        }
      } catch (error) {

      } finally {
        setIsSearching(false);
      }
    };
    fetchPrmopts();
  } , [Target]);

  // useEffect(() => { //initial load
  //   const fetchPrmopts = async () => {
  //     const res = await fetch("/api/prompt");
  //     if (res.ok){
  //       const data = await res.json();
  //       setLoadedPrompts(data);
  //     }
  //   };
  //   fetchPrmopts();
  // } , []);

  const handleTextChange = (text) => {
    if (!IsSearching){
      setIsSearching(true);
      setTarget(text);
    } else {
      setNextTarget(text);
    }
    setSearchText(text);
  }

  const handleSearchChange = (e) => {
    const text = e.target.value;
    handleTextChange(text);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username."
          value={SearchText}
          onChange={handleSearchChange}
          className="search_input"
        />
      </form>

      <PromptCardList 
        data={LoadedPrompts}
        handleTagClick={(e) => {
          handleTextChange(e)
        }}
      />
    </section>
  );
}

export default Feed;
