import { FormRowComponent, AlertComponent, FormRowSelect } from '../components';
import { useAppContext } from '../context/appContext';
import { translations } from '../data';
import { MdDelete, MdEditNote } from 'react-icons/md';
import { useEffect } from 'react';

export const CreateWordPage = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    keyword,
    nimetav,
    omastav,
    osastav,
    maInfinitive,
    daInfinitive,
    presentTense,
    pastTense,
    example,
    examples,
    handleChange,
    clearValues,
    createWord,
    editWord,
    local,
    setExamples,
    setEditExample,
    isExampleEditing,
    editExampleIndex,
    type,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'noun') {
      if (!keyword || !nimetav || !omastav || !osastav || !type) {
        displayAlert();
        return;
      }
    } else {
      if (
        !keyword ||
        !maInfinitive ||
        !daInfinitive ||
        !presentTense ||
        !pastTense ||
        !type
      ) {
        displayAlert();
        return;
      }
    }

    if (isEditing) {
      editWord();
      return;
    }

    createWord();
  };

  useEffect(() => {
    return () => clearValues();
    // eslint-disable-next-line
  }, []);

  const addExample = () => {
    const _examples = [...examples];
    _examples.push(example);
    setExamples(_examples);
  };

  const deleteExample = (index) => {
    const _examples = [...examples];
    _examples.splice(index, 1);
    setExamples(_examples);
  };

  const updateExample = () => {
    const _examples = [...examples];
    _examples.splice(editExampleIndex, 1, example);
    setExamples(_examples);
  };

  return (
    <section className="section create-word">
      <form>
        <h3>
          {isEditing
            ? translations[local].editWordTitle
            : translations[local].createWordTitle}
        </h3>
        {showAlert && <AlertComponent />}
        <div className="form-center">
          <FormRowSelect
            name="type"
            labelText={translations[local].typeLabel}
            value={type}
            handleChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
            list={[
              {
                value: 'noun',
                title: `${translations[local].nounSelectOption}`,
              },
              {
                value: 'verb',
                title: `${translations[local].verbSelectOption}`,
              },
            ]}
          />
          <FormRowComponent
            labelText={translations[local].keywordLabel}
            type="text"
            name="keyword"
            value={keyword}
            handleChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
          />
          {type === 'noun' ? (
            <>
              <FormRowComponent
                labelText={translations[local].nimetavLabel}
                type="text"
                name="nimetav"
                value={nimetav}
                handleChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
              <FormRowComponent
                labelText={translations[local].omastavLabel}
                type="text"
                name="omastav"
                value={omastav}
                handleChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
              <FormRowComponent
                labelText={translations[local].osastavLabel}
                type="text"
                name="osastav"
                value={osastav}
                handleChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <FormRowComponent
                labelText={translations[local].maInfinitiveLabel}
                type="text"
                name="maInfinitive"
                value={maInfinitive}
                handleChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
              <FormRowComponent
                labelText={translations[local].daInfinitiveLabel}
                type="text"
                name="daInfinitive"
                value={daInfinitive}
                handleChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
              <FormRowComponent
                labelText={translations[local].presentTenseLabel}
                type="text"
                name="presentTense"
                value={presentTense}
                handleChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
              <FormRowComponent
                labelText={translations[local].pastTenseLabel}
                type="text"
                name="pastTense"
                value={pastTense}
                handleChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
            </>
          )}
          <FormRowComponent
            labelText={translations[local].exampleLabel}
            name="example"
            value={example}
            handleChange={(e) =>
              handleChange({ name: e.target.name, value: e.target.value })
            }
          />
          {examples.length ? (
            <div className="examples">
              {examples.map((example, index) => {
                return (
                  <article key={`${example}-${index}`} className="example">
                    <div className="example-body">
                      <h5>{translations[local].exampleTitle}</h5>
                      <p className="words-text">{example}</p>
                    </div>
                    <div className="example-btn-container">
                      <button
                        type="button"
                        className="example-btn edit-example-btn"
                        onClick={() => setEditExample(index)}
                      >
                        <MdEditNote />
                      </button>
                      <button
                        type="button"
                        className="example-btn delete-example-btn"
                        onClick={() => deleteExample(index)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}
          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading
                ? translations[local].isLoadingButton
                : translations[local].saveButton}
            </button>
            <button
              type="button"
              className="btn clear-btn"
              onClick={clearValues}
            >
              {translations[local].clearButton}
            </button>
            {example &&
              (isExampleEditing ? (
                <button
                  type="button"
                  className="btn edit-btn"
                  onClick={updateExample}
                >
                  {translations[local].saveExampleButton}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn edit-btn"
                  onClick={addExample}
                >
                  {translations[local].addExampleButton}
                </button>
              ))}
          </div>
        </div>
      </form>
    </section>
  );
};
