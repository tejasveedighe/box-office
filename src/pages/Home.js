import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import getAPI from '../misc/config';
import ShowGrid from '../components/shows/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

export default function Home() {
  const [input, setInput] = useLastQuery('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowOption = searchOption === 'shows';

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const onSearch = () => {
    getAPI(`/search/${searchOption}?q=${input}`).then(r => setResults(r));
  };

  const keyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const renderResults = () => {
    if (results && results.length === 0) return <div>No Results</div>;
    if (results && results.length > 0) {
      return (
        <div>
          {results[0].show ? (
            <ShowGrid data={results} />
          ) : (
            <ActorGrid data={results} />
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        onChange={handleInputChange}
        onKeyDown={keyDown}
        value={input}
      />
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      <RadioInputsWrapper>
        <label htmlFor="show-search">
          Shows
          <input
            id="show-search"
            type="radio"
            value="shows"
            checked={isShowOption}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="people-search">
          People
          <input
            id="people-search"
            type="radio"
            value="people"
            checked={!isShowOption}
            onChange={onRadioChange}
          />
        </label>
      </RadioInputsWrapper>
      {renderResults()}
    </MainPageLayout>
  );
}
