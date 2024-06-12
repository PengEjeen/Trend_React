import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NaverSearch = ({ keyword }) => {
  const [newsData, setNewsData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const newsResponse = await axios.get(`http://127.0.0.1:8000/getNews/${keyword}`);
        setNewsData(newsResponse.data.response);

        const blogResponse = await axios.get(`http://127.0.0.1:8000/getBlog/${keyword}`);
        setBlogData(blogResponse.data.response);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
          <h3>News for "{keyword}"</h3>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {newsData.map((newsItem, index) => (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>
              <h4 dangerouslySetInnerHTML={{ __html: newsItem.title }} />
              <p dangerouslySetInnerHTML={{ __html: newsItem.description }} />
              <p><a href={newsItem.link} target="_blank" rel="noopener noreferrer">Read more</a></p>
              <p>Published on: {newsItem.pubDate}</p>
            </div>
          ))}
        </div>

        <div style={{ width: '48%' }}>
          <h3>Blog for "{keyword}"</h3>
          {blogData.map((blogItem, index) => (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '20px' }}>
              <h4 dangerouslySetInnerHTML={{ __html: blogItem.title }} />
              <p><a href={blogItem.link} target="_blank" rel="noopener noreferrer">Read more</a></p>
              <p>Published on: {blogItem.postdate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NaverSearch;