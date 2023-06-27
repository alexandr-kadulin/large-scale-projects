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

import { initialState } from './appContext';

const reducer = (state, action) => {
  const { local } = state;

  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.text || translations[local].validationAlert,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CLEAR_VALUES:
      return {
        ...state,
        isEditing: false,
        isExampleEditing: false,
        editExampleIndex: null,
        type: 'noun',
        editWordId: '',
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
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        word: null,
        searchValue: '',
        showAlert: true,
        alertType: 'success',
        alertText: translations[local].clearResultsAlert,
      };
    case RESET_WORD:
      return {
        ...state,
        word: null,
        searchValue: '',
      };
    case RESET_WORDS:
      return {
        ...state,
        words: [],
        searchValue: '',
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
      };
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg || translations[local].genericErrorAlert,
      };
    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: translations[local].userUpdatedAlert,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg || translations[local].genericErrorAlert,
      };
    case CREATE_WORD_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_WORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: translations[local].wordCreatedAlert,
      };
    case CREATE_WORD_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg || translations[local].genericErrorAlert,
      };
    case GET_WORD_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_WORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        words: action.payload.words,
      };
    case GET_WORD_ERROR:
      return {
        ...state,
        isLoading: false,
        words: [],
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg || translations[local].genericErrorAlert,
      };
    case SET_EDIT_WORD:
      const {
        _id,
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
      } = state.word;

      return {
        ...state,
        isEditing: true,
        editWordId: _id,
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
      };
    case SET_WORD:
      return {
        ...state,
        word: action.payload.word,
        words: [],
        searchValue: '',
      };
    case DELETE_WORD_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_WORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        word: null,
        showAlert: true,
        alertType: 'success',
        alertText: translations[local].wordRemovedAlert,
      };
    case DELETE_WORD_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg || translations[local].genericErrorAlert,
      };
    case EDIT_WORD_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_WORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: translations[local].wordUpdatedAlert,
      };
    case EDIT_WORD_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg || translations[local].genericErrorAlert,
      };
    case SET_LOCAL:
      return {
        ...state,
        local: action.payload.local,
      };
    case SET_EXAMPLES:
      return {
        ...state,
        examples: action.payload.newExamples,
        example: '',
        editExampleIndex: null,
        isExampleEditing: false,
      };
    case SET_EDIT_EXAMPLE:
      return {
        ...state,
        example: action.payload.exampleToEdit,
        isExampleEditing: true,
        editExampleIndex: action.payload.index,
      };
    default:
      throw new Error(`No such action : ${action.type}`);
  }
};

export default reducer;
