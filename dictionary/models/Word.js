import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Please provide keyword!'],
    trim: true,
    maxlength: [20, 'Keyword can not be more than 20 characters!'],
  },
  nimetav: {
    type: String,
    required: [true, 'Please provide nimetav form!'],
    trim: true,
    maxlength: [20, 'Nimetav form can not be more than 20 characters!'],
  },
  omastav: {
    type: String,
    required: [true, 'Please provide omastav form!'],
    trim: true,
    maxlength: [20, 'Omastav form can not be more than 20 characters!'],
  },
  osastav: {
    type: String,
    required: [true, 'Please provide osastav form!'],
    trim: true,
    maxlength: [20, 'Osastav form can not be more than 20 characters!'],
  },
  examples: {
    type: [
      {
        type: String,
        maxlength: [80, 'Example can not be more than 20 characters!'],
      },
    ],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user!'],
  },
  type: {
    type: String,
    enum: ['noun', 'verb'],
    required: [true, 'Please provide type!'],
  },
});

export default mongoose.model('Word', WordSchema);
