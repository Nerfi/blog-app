import React, {useState} from 'react';

const SearchBar = (props) => {

  const [query, setQuery] = useState('');

  const handleChange = event => {
      setQuery(event.target.value)
  };


  const callSearchFucntion = e => {
    e.preventDefault();
    props.search(query);
  };


  return(
    <div>
       <form>
          <input
            placeholder="Search for posts"
            value={query}
            onChange={handleChange}
          />
        <input onClick={callSearchFucntion} type="submit" value="SEARCH" />

        </form>

    </div>
  );
};

export default SearchBar;
