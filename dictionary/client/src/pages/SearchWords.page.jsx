import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { LoadingComponent, SearchComponent } from '../components';
import { translations } from '../data';

const wordPropsData = ['nimetav', 'omastav', 'osastav'];
const verbPropsData = [
  'maInfinitive',
  'daInfinitive',
  'presentTense',
  'pastTense',
];

export const SearchWordsPage = () => {
  const {
    user,
    isLoading,
    word,
    clearResults,
    setEditWord,
    deleteWord,
    local,
  } = useAppContext();

  return (
    <section>
      <SearchComponent />
      {word && (
        <section className="section words">
          {word.type === 'noun' ? (
            <div className="words-container">
              {wordPropsData.map((prop) => {
                return (
                  <article key={prop} className="word">
                    <header className="word-header">
                      <div className="main-icon">{prop.slice(0, 2)}</div>
                      <div className="word-info">
                        <h5>{prop}</h5>
                        <p className="words-text">{word[prop]}</p>
                      </div>
                    </header>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="words-container">
              {verbPropsData.map((prop) => {
                return (
                  <article key={prop} className="word">
                    <header className="word-header">
                      <div className="main-icon">{prop.slice(0, 2)}</div>
                      <div className="word-info">
                        <h5>{prop}</h5>
                        <p className="words-text">{word[prop]}</p>
                      </div>
                    </header>
                  </article>
                );
              })}
            </div>
          )}
          {word.examples.length ? (
            <div className="examples">
              {word.examples.map((example, index) => {
                return (
                  <article key={`${example}-${index}`} className="example">
                    <h5>{translations[local].exampleTitle}</h5>
                    <p className="words-text">{example}</p>
                  </article>
                );
              })}
            </div>
          ) : null}
          <div className="btn-container">
            <button
              type="button"
              className="btn clear-btn"
              onClick={clearResults}
              disabled={isLoading}
            >
              {translations[local].clearButton}
            </button>
            {user.role === 'admin' && (
              <Link
                to="/word"
                className="btn edit-btn"
                onClick={() => setEditWord(word._id)}
                disabled={isLoading}
              >
                {translations[local].editButton}
              </Link>
            )}
            {user.role === 'admin' && (
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteWord(word._id, word.type)}
                disabled={isLoading}
              >
                {isLoading
                  ? translations[local].isLoadingButton
                  : translations[local].removeButton}
              </button>
            )}
          </div>
        </section>
      )}
      {isLoading && <LoadingComponent center />}
    </section>
  );
};
