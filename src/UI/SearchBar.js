import React, {useState, useEffect} from 'react';

const SearchBar = () => {

  const [query, setQuery] = useState('');
  const [posts , setPosts] = useState([]);

  const handleChange = event => {
      setQuery(event.target.value)
  };

  const searchQuery = async (query) => {
    const desiredPost = await fetch(`/posts?q=${query}`);
    const response = desiredPost.json();
    setPosts(response);
  }

  console.log(posts ||query)
  return(
    <div>
       <form>
          <input
            placeholder="Search for posts"
            value={query}
            onChange={handleChange}
          />
        <input onClick={searchQuery} type="submit" value="SEARCH" />

        </form>

        <p style={{color: 'red'}}>your query is {query}</p>

    </div>
  );
};

export default SearchBar;
