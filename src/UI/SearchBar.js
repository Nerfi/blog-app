import React, {useState} from 'react';
import firebase from '../firebase/firebase';


const SearchBar = (props) => {

  const [query, setQuery] = useState('');


  const handleChange = e => setQuery(e.target.value);

  const executeProp = e => {
    e.preventDefault()
      return props.searchProp();

  }


  return(
    <div>
       <form>
          <input
            placeholder="Search for Posts"
            value={query}
            onChange={handleChange}
          />
      <button style={{height: '70px', backgroundColor: 'red'}} onClick={executeProp} type="submit" value="SEARCHWEY" />

        </form>

    </div>
  );
};

export default SearchBar;
