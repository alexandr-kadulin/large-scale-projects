import { useAppContext } from '../context/appContext';
import { FormRowComponent, AlertComponent } from '.';
import { useMemo } from 'react';
import { translations } from '../data';

export const SearchComponent = () => {
  const {
    isLoading,
    searchValue,
    handleChange,
    getWord,
    showAlert,
    word,
    words,
    local,
    setWord,
    resetWords,
    setWordFromSearch,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setWordFromSearch(searchValue);
  };

  const searchWord = () => {
    let timeoutId;

    return (e) => {
      handleChange({ name: e.target.name, value: e.target.value });
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (e.target.value === '') {
          resetWords();
        } else {
          getWord(e.target.value);
        }
      }, 500);
    };
  };

  const debounceSearchWord = useMemo(
    () => searchWord(),
    // eslint-disable-next-line
    []
  );

  const handleBlur = (e) => {
    if (e.relatedTarget?.classList.contains('search-results')) {
      return;
    } else {
      resetWords();
    }
  };

  return (
    <section className="section search">
      <form onSubmit={handleSubmit}>
        <h3>
          {(word && word.keyword) || translations[local].searchWordsTitle}
        </h3>
        {showAlert && <AlertComponent />}
        <div className="form-center">
          <div className="search-container">
            <FormRowComponent
              labelText={translations[local].searchValueLabel}
              type="text"
              name="searchValue"
              value={searchValue}
              handleChange={debounceSearchWord}
              handleBlur={handleBlur}
            />
            {words.length ? (
              <article className="section search-results" tabIndex="0">
                <ul>
                  {words.map((word) => {
                    return (
                      <li key={word._id} onClick={() => setWord(word._id)}>
                        {word.keyword}
                      </li>
                    );
                  })}
                </ul>
              </article>
            ) : null}
          </div>
        </div>
      </form>
    </section>
  );
};
