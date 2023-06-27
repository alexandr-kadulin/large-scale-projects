import express from 'express';
const router = express.Router();

import { authenticateUser, authorizePermissions } from '../middleware/auth.js';

import {
  getAllWords,
  createWord,
  getWord,
  updateWord,
  deleteWord,
} from '../controllers/wordsController.js';

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllWords);
router
  .route('/')
  .post(authenticateUser, authorizePermissions('admin'), createWord);

router
  .route('/:id')
  .patch(authenticateUser, authorizePermissions('admin'), updateWord);
router
  .route('/:id')
  .delete(authenticateUser, authorizePermissions('admin'), deleteWord);

router.route('/:keyword').get(authenticateUser, getWord);

export default router;
