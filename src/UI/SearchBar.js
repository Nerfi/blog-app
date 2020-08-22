import React, {useState} from 'react';
import firebase from '../firebase/firebase';


const SearchBar = (props) => {

  const [query, setQuery] = useState('');


  const handleChange = e => setQuery(e.target.value);


  return(
    <div>
       <form>
          <input
            placeholder="Search for Posts"
            value={query}
            onChange={handleChange}
          />
      <button style={{height: '80px', backgroundColor: 'red'}} onClick={props.searchProp} type="submit" value="SEARCHWEY" />

        </form>

    </div>
  );
};

export default SearchBar;
