import Word from '../models/Word.js';
import Verb from '../models/Verb.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createWord = async (req, res) => {
  let word;

  const {
    keyword,
    nimetav,
    omastav,
    osastav,
    maInfinitive,
    daInfinitive,
    presentTense,
    pastTense,
    type,
  } = req.body;

  if (req.query.type === 'noun') {
    if (
      !keyword ||
      !nimetav ||
      !omastav ||
      !osastav ||
      !type ||
      type !== 'noun'
    ) {
      throw new BadRequestError('Please provide all values!');
    }
  } else {
    if (
      !keyword ||
      !maInfinitive ||
      !daInfinitive ||
      !presentTense ||
      !pastTense ||
      !type ||
      type !== 'verb'
    ) {
      throw new BadRequestError('Please provide all values!');
    }
  }

  const wordAlreadyExists = await Word.findOne({ keyword });
  const verbAlreadyExists = await Verb.findOne({ keyword });

  if (wordAlreadyExists || verbAlreadyExists) {
    throw new BadRequestError('Word already exists!');
  }

  req.body.createdBy = req.user.userId;

  if (req.query.type === 'noun') {
    word = await Word.create(req.body);
  } else {
    word = await Verb.create(req.body);
  }

  res.status(StatusCodes.CREATED).json({ word });
};

const getWord = async (req, res) => {
  let words;

  const { keyword: searchValue } = req.params;

  words = await Word.find({
    keyword: { $regex: `${searchValue}`, $options: 'i' },
  }).limit(5);

  if (!words.length) {
    words = await Verb.find({
      keyword: { $regex: `${searchValue}`, $options: 'i' },
    }).limit(5);

    if (!words.length) {
      throw new NotFoundError('No such word!');
    }
  }

  res.status(StatusCodes.OK).json({ words });
};

const getAllWords = async (req, res) => {
  const words = await Word.find({});
  const verbs = await Verb.find({});
  res.status(StatusCodes.OK).json({ words, verbs });
};

const deleteWord = async (req, res) => {
  let word;

  const { id: wordId } = req.params;

  if (req.query.type === 'noun') {
    word = await Word.findOne({ _id: wordId, createdBy: req.user.userId });
  } else {
    word = await Verb.findOne({ _id: wordId, createdBy: req.user.userId });
  }

  if (!word) {
    throw new NotFoundError('No such word!');
  }

  await word.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success. Word removed!' });
};

const updateWord = async (req, res) => {
  let word;
  let updatedWord;

  const { id: wordId } = req.params;

  if (req.query.type === 'noun') {
    word = await Word.findOne({ _id: wordId, createdBy: req.user.userId });
  } else {
    word = await Verb.findOne({ _id: wordId, createdBy: req.user.userId });
  }

  if (!word) {
    throw new NotFoundError('No such word!');
  }

  if (req.query.type === 'noun') {
    updatedWord = await Word.findOneAndUpdate({ _id: wordId }, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    updatedWord = await Verb.findOneAndUpdate({ _id: wordId }, req.body, {
      new: true,
      runValidators: true,
    });
  }

  res.status(StatusCodes.OK).json({ updatedWord });
};

export { getAllWords, createWord, getWord, updateWord, deleteWord };
