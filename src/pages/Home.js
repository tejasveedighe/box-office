import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import getAPI from '../misc/config';

export default function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    getAPI(`/search/shows?q=${input}`).then(r => setResults(r));
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
