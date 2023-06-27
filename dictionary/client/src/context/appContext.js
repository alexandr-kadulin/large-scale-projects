import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { translations } from '../data';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CLEAR_RESULTS,
  CREATE_WORD_BEGIN,
  CREATE_WORD_SUCCESS,
  CREATE_WORD_ERROR,
  GET_WORD_BEGIN,
  GET_WORD_SUCCESS,
  GET_WORD_ERROR,
  SET_EDIT_WORD,
  DELETE_WORD_BEGIN,
  DELETE_WORD_SUCCESS,
  DELETE_WORD_ERROR,
  EDIT_WORD_BEGIN,
  EDIT_WORD_SUCCESS,
  EDIT_WORD_ERROR,
  SET_LOCAL,
  RESET_WORD,
  SET_WORD,
  RESET_WORDS,
  SET_EXAMPLES,
  SET_EDIT_EXAMPLE,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const word = localStorage.getItem('word');
const local = localStorage.getItem('local');

const initialState = {
  showSidebar: false,
  showAlert: false,
  isLoading: false,
  isEditing: false,
  isExampleEditing: false,
  local: local || 'en',
  user: user ? JSON.parse(user) : null,
  token: token,
  word: word ? JSON.parse(word) : null,
  words: [],
  searchValue: '',
  editWordId: '',
  alertText: '',
  alertType: '',
  type: 'noun',
  keyword: '',
  nimetav: '',
  omastav: '',
  osastav: '',
  maInfinitive: '',
  daInfinitive: '',
  presentTense: '',
  pastTense: '',
  example: '',
  examples: [],
  editExampleIndex: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }

      return Promise.reject(error);
    }
  );

  const displayAlert = (text) => {
    dispatch({ type: DISPLAY_ALERT, payload: { text } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  const setLocal = (local) => {
    dispatch({
      type: SET_LOCAL,
      payload: { local },
    });

    addLocalToLocalStorage(local);
  };

  const addLocalToLocalStorage = (local) => {
    localStorage.setItem('local', local);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const addWordToLocalStorage = (word) => {
    localStorage.setItem('word', JSON.stringify(word));
  };

  const removeWordFromLocalStorage = () => {
    localStorage.removeItem('word');
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
    removeWordFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, token } = data;

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const clearResults = () => {
    dispatch({ type: CLEAR_RESULTS });
    removeWordFromLocalStorage();
    clearAlert();
  };

  const resetWord = () => {
    dispatch({ type: RESET_WORD });
    removeWordFromLocalStorage();
  };

  const resetWords = () => {
    dispatch({ type: RESET_WORDS });
  };

  const createWord = async () => {
    dispatch({ type: CREATE_WORD_BEGIN });

    try {
      const {
        keyword,
        nimetav,
        omastav,
        osastav,
        maInfinitive,
        daInfinitive,
        presentTense,
        pastTense,
        examples,
        type,
      } = state;

      const requestObject =
        state.type === 'noun'
          ? {
              keyword: keyword.toLowerCase(),
              nimetav: nimetav.toLowerCase(),
              omastav: omastav.toLowerCase(),
              osastav: osastav.toLowerCase(),
              type: type.toLowerCase(),
              examples,
            }
          : {
              keyword: keyword.toLowerCase(),
              maInfinitive: maInfinitive.toLowerCase(),
              daInfinitive: daInfinitive.toLowerCase(),
              presentTense: presentTense.toLowerCase(),
              pastTense: pastTense.toLowerCase(),
              type: type.toLowerCase(),
              examples,
            };

      await authFetch.post('/words', requestObject, {
        params: {
          type: state.type,
        },
      });

      dispatch({ type: CREATE_WORD_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }

      dispatch({
        type: CREATE_WORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const getWord = async (searchValue) => {
    dispatch({ type: GET_WORD_BEGIN });

    try {
      const {
        data: { words },
      } = await authFetch.get(`/words/${searchValue}`);

      dispatch({
        type: GET_WORD_SUCCESS,
        payload: { words },
      });
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }

      dispatch({
        type: GET_WORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const setEditWord = (id) => {
    dispatch({ type: SET_EDIT_WORD, payload: { id } });
  };

  const editWord = async () => {
    dispatch({ type: EDIT_WORD_BEGIN });

    try {
      const {
        keyword,
        nimetav,
        omastav,
        osastav,
        maInfinitive,
        daInfinitive,
        presentTense,
        pastTense,
        examples,
        type,
      } = state;

      const requestObject =
        state.type === 'noun'
          ? {
              keyword: keyword.toLowerCase(),
              nimetav: nimetav.toLowerCase(),
              omastav: omastav.toLowerCase(),
              osastav: osastav.toLowerCase(),
              type: type.toLowerCase(),
              examples,
            }
          : {
              keyword: keyword.toLowerCase(),
              maInfinitive: maInfinitive.toLowerCase(),
              daInfinitive: daInfinitive.toLowerCase(),
              presentTense: presentTense.toLowerCase(),
              pastTense: pastTense.toLowerCase(),
              type: type.toLowerCase(),
              examples,
            };

      await authFetch.patch(`/words/${state.editWordId}`, requestObject, {
        params: {
          type: state.type,
        },
      });

      dispatch({ type: EDIT_WORD_SUCCESS });
      clearValues();
      resetWord();
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }

      dispatch({
        type: EDIT_WORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const deleteWord = async (id, type) => {
    dispatch({ type: DELETE_WORD_BEGIN });

    try {
      await authFetch.delete(`/words/${id}`, {
        params: {
          type,
        },
      });

      dispatch({ type: DELETE_WORD_SUCCESS });
      removeWordFromLocalStorage();
      clearValues();
    } catch (error) {
      if (error.response.status === 401) {
        return;
      }

      dispatch({
        type: DELETE_WORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const setWord = (id) => {
    const word = state.words.find((word) => word._id === id);
    dispatch({ type: SET_WORD, payload: { word } });
    addWordToLocalStorage(word);
  };

  const setExamples = (newExamples) => {
    dispatch({ type: SET_EXAMPLES, payload: { newExamples } });
  };

  const setEditExample = (index) => {
    const exampleToEdit = state.examples[index];
    dispatch({ type: SET_EDIT_EXAMPLE, payload: { exampleToEdit, index } });
  };

  const setWordFromSearch = (searchValue) => {
    const word = state.words.find(
      (word) => word.keyword === searchValue.toLowerCase()
    );

    if (word) {
      setWord(word._id);
    } else {
      displayAlert(translations[local].wordNotFoundAlert);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        clearResults,
        createWord,
        getWord,
        setEditWord,
        editWord,
        deleteWord,
        setLocal,
        setWord,
        resetWords,
        setExamples,
        setEditExample,
        setWordFromSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, initialState, useAppContext };
