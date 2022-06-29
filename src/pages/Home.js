import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

export default function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => setResults(result));
  };

  const keyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) return <div>No Results</div>;
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={handleInputChange}
        onKeyDown={keyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
}
