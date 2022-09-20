import './App.css';
import { useEffect, useState } from "react";
import DisplayPosts from './components/DisplayPosts';

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [searchData, setSearchData] = useState();
  const [query, setQuery] = useState("");
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json().then((data) => {
      setSearchData(data);
      setPostsData(data);
    })).catch(() => {
      throw new Error("API Error");
    });
  }, []);

  useEffect(() => {
    if(searchData) {
      let filteredData = searchData.filter((post) => post.title.includes(query));
      setPostsData(filteredData);
    }
  }, [query, searchData]);

  const handleChange = (event) => {
    setQuery(event?.target.value);
  }

  const debounce = (fn, delay = 500) => {
    let timer;
    return function(...args) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=> {fn.apply(this, args)}, delay);
    }
  }

  const optimizedHandleChange = debounce((e) => handleChange(e));

  return (
    <div className="App">
      <div className='heading-row'>
        <h1>GGWP Posts {query}</h1>
        <div className='input-wrapper'>
          <input type="text" name="search" placeholder="Search Post..." onChange={optimizedHandleChange}/>
        </div>
      </div>
      {searchData ? <DisplayPosts searchData={postsData}></DisplayPosts> : <div className='loading'>Loading Posts....</div>}
    </div>
  );
}

export default App;
